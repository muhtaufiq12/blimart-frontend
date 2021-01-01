#define _USE_MATH_DEFINES

#include <opencv2/core.hpp>
#include <opencv2/imgproc.hpp>
#include <opencv2/highgui.hpp>
#include <iostream>
#include <cmath>

using namespace cv;
using namespace std;
#define d_type double;

d_type kernel[9] = {1, 0, 1, 0, -4, 0, 1, 0, 1};
d_type kernelx[9] = {0, 0, 0, .5, 0, -.5, 0, 0, 0};
d_type kernely[9] = {0, .5, 0, 0, 0, 0, 0, -.5, 0};

d_type *allocMatrix(int W, int H)
{

    d_type *out = (d_type *)calloc((size_t)H * W, sizeof(d_type));
    return out;
}
d_type *conv3(int W, int H, d_type *in, d_type *k)
{
    d_type *out = allocMatrix(W, H);
    for (int i = 1; i < H - 1; i++)
    {
        for (int j = 1; j < W - 1; j++)
        {
            int idx = i * W + j;
            out[idx] = in[idx] * k[4] + in[idx - 1] * k[3] + in[idx + 1] * k[5] +
                       in[idx - W] * k[1] + in[idx - W - 1] * k[0] + in[idx - W + 1] * k[2] +
                       in[idx + W] * k[7] + in[idx + W - 1] * k[6] + in[idx + W + 1] * k[8];
        }
    }
    return out;
}
d_type *gradientFlow(int W, int H, d_type *u, d_type *phi, d_type alfa, d_type dt)
{
    d_type *a = conv3(W, H, u, kernel);
    d_type *out = allocMatrix(W, H);
    for (int i = 1; i < H - 1; i++)
    {
        for (int j = 1; j < W - 1; j++)
        {
            int idx = i * W + j;
            /*d_type buf1 = u[idx + W] + u[idx - W] + u[idx + 1] + u[idx - 1] - 4 * u[idx];
            d_type buf2 = I[idx + W] + I[idx - W] + I[idx + 1] + I[idx - 1] - 4 * I[idx];*/
            //out[idx] = (alfa * dt * buf1 - dt * (u[idx] - buf2)) + u[idx];
            out[idx] = (alfa * a[idx] - (u[idx] - phi[idx])) * dt + u[idx];
        }
    }
    return out;
}
d_type diracFunction(d_type phi, d_type epsilon)
{
    return (1 / M_PI) * (epsilon / (phi * phi + epsilon * epsilon));
}
d_type *curvatureFunction(int W, int H, d_type *phi, d_type epsilon)
{
    d_type *out_x = allocMatrix(W, H);
    d_type *out_y = allocMatrix(W, H);

    for (int i = 1; i < H - 1; i++)
    {
        for (int j = 1; j < W - 1; j++)
        {
            const int idx = i * W + j;
            //laplacian
            d_type grad_x = .5 * phi[idx - 1] - .5 * phi[idx + 1] + epsilon;
            d_type grad_y = .5 * phi[idx - W] - .5 * phi[idx + W] + epsilon;
            d_type grad_len = sqrt(grad_x * grad_x + grad_y * grad_y);

            out_x[idx] = grad_x / grad_len;
            out_y[idx] = grad_y / grad_len;
        }
    }

    for (int i = 1; i < H - 1; i++)
    {
        for (int j = 1; j < W - 1; j++)
        {
            int idx = i * W + j;
            //laplacian
            d_type grad_x = .5 * out_x[idx - 1] - .5 * out_x[idx + 1];
            d_type grad_y = .5 * out_y[idx - W] - .5 * out_y[idx + W];

            out_x[idx] = grad_x + grad_y;
        }
    }
    delete out_y;
    return out_x;
}
void levelSet(int W, int H, d_type *phi, d_type *laplacian, d_type *curvature, d_type *u, d_type epsilon, d_type lambda, d_type miu, d_type dt, d_type v)
{

    for (int i = 1; i < H - 1; i++)
    {
        for (int j = 1; j < W - 1; j++)
        {
            int idx = i * W + j;
            d_type dirac = diracFunction(phi[idx], epsilon);

            phi[idx] += (miu * dirac * curvature[idx] + lambda * u[idx] * dirac + v * (laplacian[idx] - curvature[idx])) * dt;
        }
    }
}
int main()
{

    Mat img = imread("img2.jpg", 0);

    Mat phi_img = Mat::zeros(img.rows, img.cols, CV_32FC1);
    phi_img -= 1;
    cv::Rect sub1ROI(img.cols / 2 - 75, img.rows / 2 - 75, 150, 150);
    rectangle(phi_img, sub1ROI, 1, -1, 8);

    img.convertTo(img, CV_32F);
    Mat outImg;
    d_type *I = img.ptr<d_type>();
    d_type *phi = phi_img.ptr<d_type>();

    d_type miu = 0.2 / 0.5;
    d_type v = 0.4;
    int lambda = 8;
    d_type dt = 0.02;

    d_type epsilon = numeric_limits<d_type>::epsilon();

    //init variabel
    d_type *u = allocMatrix(img.cols, img.rows);
    d_type *MLaplace = conv3(img.cols, img.rows, I, kernel);
    d_type *a = conv3(3, 3, kernel, kernel);
    for (int i = 0; i < 48; i++)
    {
        d_type *u1 = gradientFlow(img.cols, img.rows, u, MLaplace, 1, dt);
        delete u;
        u = u1;
        outImg = Mat(img.rows, img.cols, CV_32F, u);
        outImg.convertTo(outImg, CV_8UC1);
        imshow("Tes", outImg);
        waitKey(0);
    }
    for (int i = 0; i < 10; i++)
    {
        d_type *curvature = curvatureFunction(img.cols, img.rows, phi, epsilon);
        levelSet(img.cols, img.rows, phi, MLaplace, curvature, u, epsilon, lambda, miu, dt, v);
        outImg = Mat(img.rows, img.cols, CV_32FC1, phi);
        imshow("tes", outImg);
        waitKey(0);
        delete curvature;
    }

    return 0;
}