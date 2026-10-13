import type { Program } from "./programs";

export const dipPrograms: Program[] = [
  {
    id: 1,
    title: "Basic Image Operations & I/O",
    language: "Python",
    filename: "dip_program_1.py",
    description:
      "Read and display a digital image, resize, convert to grayscale and black & white, draw elliptical image profile, separate and merge R/G/B color planes, and write image data to file.",
    categories: ["Image I/O"],
    code: `import cv2
import numpy as np

# a, b) Read and display image
img_ink = cv2.imread('Cartooning.jpg')
cv2.imshow("Cartoon img image read and display", img_ink)
cv2.waitKey(0)

# c) Resize given image
resize_img = cv2.resize(img_ink, (500, 500))
cv2.imshow("Cartooning resized", resize_img)
cv2.waitKey(0)

# d) Convert given color image into grayscale
img_gray = cv2.cvtColor(img_ink, cv2.COLOR_BGR2GRAY)
cv2.imshow("Cartooning grayed", img_gray)
cv2.waitKey(0)

# e) Convert given color/gray scale image into black & white image
_, img_bw = cv2.threshold(img_gray, 127, 255, cv2.THRESH_BINARY)
cv2.imshow("Cartooning bw", img_bw)
cv2.waitKey(0)

# f) Draw image profile (ellipse mask)
height, width = img_ink.shape[:2]
center = (width // 2, height // 2)
axes = (width // 2, height // 2)
mask = np.zeros((height, width), dtype=np.uint8)
cv2.ellipse(mask, center, axes, angle=0, startAngle=0, endAngle=360, color=255, thickness=-1)
res_img = cv2.bitwise_and(img_ink, img_ink, mask=mask)
cv2.imshow("profile ellipse", res_img)
cv2.waitKey(0)

# g) Separate Color image in three R, G & B planes
# Note: cv2.split returns channels in BGR order
b_plane, g_plane, r_plane = cv2.split(img_ink)
cv2.imshow("R plane", r_plane)
cv2.imshow("G plane", g_plane)
cv2.imshow("B plane", b_plane)
cv2.waitKey(0)

# h) Create Color Image using R, G and B three separate planes
img_merged = cv2.merge((b_plane, g_plane, r_plane))
cv2.imshow("Merged BGR image", img_merged)
cv2.waitKey(0)

# i) Write given data in image file
cv2.imwrite("newimage.jpg", img_merged)
cv2.destroyAllWindows()`,
  },
  {
    id: 2,
    title: "Point Processing Methods",
    language: "Python",
    filename: "dip_program_2.py",
    description:
      "Image point processing methods: obtain negative image, flip image (horizontal, vertical, both), thresholding, and contrast stretching using normalization.",
    categories: ["Point Processing"],
    code: `import cv2

img_ob = cv2.imread('cartoonanime.jpg')
cv2.imshow("Original image", img_ob)
cv2.waitKey(0)

# a) Obtain negative Image
neg_img = cv2.bitwise_not(img_ob)
cv2.imshow("Negative image", neg_img)
cv2.waitKey(0)

# b) Obtain flip Image
flp_1 = cv2.flip(img_ob, 1)       # Horizontal flip
flp_0 = cv2.flip(img_ob, 0)       # Vertical flip
flp_neg1 = cv2.flip(img_ob, -1)   # Both axes flip

cv2.imshow("Horizontal flip (1)", flp_1)
cv2.waitKey(0)
cv2.imshow("Vertical flip (0)", flp_0)
cv2.waitKey(0)
cv2.imshow("Both axes flip (-1)", flp_neg1)
cv2.waitKey(0)

# c) Thresholding
img_gray = cv2.cvtColor(img_ob, cv2.COLOR_BGR2GRAY)
_, img_bw = cv2.threshold(img_gray, 127, 255, cv2.THRESH_BINARY)
cv2.imshow("Thresholded image", img_bw)
cv2.waitKey(0)

# d) Contrast stretching
const = cv2.normalize(img_gray, None, alpha=0, beta=255,
                      norm_type=cv2.NORM_MINMAX, dtype=cv2.CV_8U)
cv2.imshow("Contrast stretched", const)
cv2.waitKey(0)
cv2.destroyAllWindows()`,
  },
  {
    id: 3,
    title: "Image Arithmetic Operations",
    language: "Python",
    filename: "dip_program_3.py",
    description:
      "Image arithmetic operations: addition of two images, subtraction of one image from another, and calculation of per-channel mean values.",
    categories: ["Arithmetic Operations"],
    code: `import cv2
import numpy as np

img1 = cv2.imread("Cartoon1.jpg")
img2 = cv2.imread("Cartoon2.jpg")
cv2.imshow('Image 1', img1)
cv2.imshow('Image 2', img2)
cv2.waitKey(0)

no_img1 = cv2.resize(img1, (500, 500))
no_img2 = cv2.resize(img2, (500, 500))

# a) Addition of two images
add_img = cv2.add(no_img1, no_img2)
cv2.imshow("Added image", add_img)
cv2.waitKey(0)

# b) Subtract one image from another image
sub_img = cv2.subtract(no_img1, no_img2)
cv2.imshow("Subtracted Image", sub_img)
cv2.waitKey(0)

# c) Calculate mean value of image
mean_img = cv2.mean(no_img1)
print("B channel:", round(mean_img[0], 2))
print("G channel:", round(mean_img[1], 2))
print("R channel:", round(mean_img[2], 2))

cv2.waitKey(0)
cv2.destroyAllWindows()`,
  },
  {
    id: 4,
    title: "Image Logical Operations",
    language: "Python",
    filename: "dip_program_4.py",
    description:
      "Image logical (bitwise) operations: AND operation, OR operation, and NOT operation (negative image) between two images.",
    categories: ["Logical Operations"],
    code: `import cv2

img1 = cv2.imread('Image1.jpg')
img2 = cv2.imread('Image2.jpg')

# Resize to same dimensions for bitwise operations
img1 = cv2.resize(img1, (500, 500))
img2 = cv2.resize(img2, (500, 500))

# a) AND Operation b/w two images
and_img = cv2.bitwise_and(img1, img2)
cv2.imshow("AND Result", and_img)
cv2.waitKey(0)

# b) OR Operation b/w two images
or_img = cv2.bitwise_or(img1, img2)
cv2.imshow("OR Result", or_img)
cv2.waitKey(0)

# c) NOT Operation (Negative image)
not_img = cv2.bitwise_not(img2)
cv2.imshow("NOT Result", not_img)
cv2.waitKey(0)
cv2.destroyAllWindows()`,
  },
  {
    id: 5,
    title: "Histogram Calculation & Equalization",
    language: "Python",
    filename: "dip_program_5.py",
    description:
      "Histogram calculation and equalization: (a) using standard OpenCV functions with YCrCb conversion, (b) manual histogram equalization without standard equalizeHist.",
    categories: ["Histogram Processing"],
    code: `import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread('Sample.jpg')
cv2.imshow("Original image", img)
cv2.waitKey(0)

# Histogram calculation using matplotlib
plt.figure("Histogram")
plt.hist(img.ravel(), bins=256, range=[0, 255])
plt.title("Image Histogram")
plt.xlabel("Pixel Value")
plt.ylabel("Frequency")
plt.show()

# a) Histogram equalization using standard functions (YCrCb)
ycrcb = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb)
channels = list(cv2.split(ycrcb))
channels[0] = cv2.equalizeHist(channels[0])
eq_img = cv2.merge(channels)
eq_img_bgr = cv2.cvtColor(eq_img, cv2.COLOR_YCrCb2BGR)
cv2.imshow("Equalized (standard)", eq_img_bgr)
cv2.waitKey(0)

# b) Histogram equalization without standard function
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
hist = np.zeros(256, dtype=int)
for row in img_gray:
    for pixel in row:
        hist[pixel] += 1
cdf = np.cumsum(hist)
cdf_min = cdf[cdf > 0].min()
total_pixels = img_gray.shape[0] * img_gray.shape[1]
lut = np.round((cdf - cdf_min) / (total_pixels - cdf_min) * 255).astype(np.uint8)
eq_manual = lut[img_gray]
cv2.imshow("Equalized (manual)", eq_manual)
cv2.waitKey(0)
cv2.destroyAllWindows()`,
  },
  {
    id: 6,
    title: "Geometric Transformations",
    language: "Python",
    filename: "dip_program_6.py",
    description:
      "Geometric transformations of images: translation, scaling, rotation, shrinking, and zooming using affine warp and resize operations.",
    categories: ["Geometric Transforms"],
    code: `import cv2
import numpy as np

img = cv2.imread('Image1.jpg')
cv2.imshow('Original Image', img)
cv2.waitKey(0)

rows, col = img.shape[:2]

# a) Translation
M = np.float32([[1, 0, 50], [0, 1, 50]])
tr_img = cv2.warpAffine(img, M, (col, rows))
cv2.imshow('Translated image', tr_img)
cv2.waitKey(0)

# b) Scaling
sc_img = cv2.resize(img, (300, 300), interpolation=cv2.INTER_AREA)
cv2.imshow('Scaled image', sc_img)
cv2.waitKey(0)

# d) Shrinking
ds_img = cv2.resize(img, (int(col / 2), int(rows / 2)),
                    interpolation=cv2.INTER_AREA)
cv2.imshow('Shrunk image', ds_img)
cv2.waitKey(0)

# e) Zooming
zoom_img = cv2.resize(img, (col * 2, rows * 2),
                      interpolation=cv2.INTER_LINEAR)
cv2.imshow('Zoomed image', zoom_img)
cv2.waitKey(0)

# c) Rotation
rot_mat = cv2.getRotationMatrix2D((col / 2, rows / 2), 90, 0.6)
rot_img = cv2.warpAffine(img, rot_mat, (col, rows))
cv2.imshow('Rotated image', rot_img)
cv2.waitKey(0)
cv2.destroyAllWindows()`,
  },
  {
    id: 7,
    title: "Image Restoration & Noise Reduction",
    language: "Python",
    filename: "dip_program_7.py",
    description:
      "Image noise models and restoration: remove salt-and-pepper noise and minimize Gaussian noise using median filter.",
    categories: ["Noise Reduction"],
    code: `import cv2

# b, d) Salt and Pepper Noise & Median Filter
img_sp = cv2.imread("salt and pepper.png")
cv2.imshow("Salt and Pepper Noise", img_sp)
cv2.waitKey(0)

med_img_sp = cv2.medianBlur(img_sp, 5)
cv2.imshow("After Median Filter (S&P removed)", med_img_sp)
cv2.waitKey(0)

# c, d) Gaussian Noise & Median Filter
img_gau = cv2.imread('Gaussiannoise.png')
cv2.imshow("Gaussian Noise", img_gau)
cv2.waitKey(0)

med_img_gau = cv2.medianBlur(img_gau, 5)
cv2.imshow("After Median Filter (Gaussian reduced)", med_img_gau)
cv2.waitKey(0)
cv2.destroyAllWindows()`,
  },
  {
    id: 8,
    title: "Spatial Low Pass & High Pass Filters",
    language: "Python",
    filename: "dip_program_8.py",
    description:
      "Spatial domain filtering: low pass filter using a box kernel (averaging filter) and high pass filter using the Laplacian operator.",
    categories: ["Spatial Filtering"],
    code: `import cv2
import numpy as np

img = cv2.imread('tiger.jpg', cv2.IMREAD_GRAYSCALE)
cv2.imshow("Gray Scaled image", img)
cv2.waitKey(0)

# Spatial Low Pass Filter (Box/Averaging Filter)
kernel_box = np.ones((5, 5), np.float32) / 25
print("Kernel Box:\\n", kernel_box)
lpf_img = cv2.filter2D(img, -1, kernel_box)
cv2.imshow("Low Pass Filter (Box)", lpf_img)
cv2.waitKey(0)

# Spatial High Pass Filter (Laplacian)
hpf = cv2.Laplacian(img, cv2.CV_64F, ksize=3)
scale_hpf = cv2.convertScaleAbs(hpf)
cv2.imshow("High Pass Filter (Laplacian)", scale_hpf)
cv2.waitKey(0)
cv2.destroyAllWindows()`,
  },
  {
    id: 9,
    title: "Frequency Domain Filtering (FFT/IFFT)",
    language: "Python",
    filename: "dip_program_9.py",
    description:
      "Image frequency domain filtering: apply FFT and visualize magnitude spectrum, perform low pass and high pass filtering in frequency domain, and reconstruct image using IFFT.",
    categories: ["Frequency Filtering"],
    code: `import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread('Cartoons.jpg', cv2.IMREAD_GRAYSCALE)
cv2.imshow('Original image', img)
cv2.waitKey(0)

rows, cols = img.shape

# a) Apply FFT on given image
dft = np.fft.fft2(np.float32(img))
dft_shift = np.fft.fftshift(dft)
magnitude = 20 * np.log(np.abs(dft_shift) + 1)
plt.figure("FFT Magnitude Spectrum")
plt.imshow(magnitude, cmap='gray')
plt.title("Magnitude Spectrum (FFT)")
plt.colorbar()
plt.show()

# b) Low Pass Filter in frequency domain
crow, ccol = rows // 2, cols // 2
mask_lp = np.zeros((rows, cols), np.uint8)
r = 30  # cutoff radius
cv2.circle(mask_lp, (ccol, crow), r, 1, thickness=-1)
lp_shift = dft_shift * mask_lp
lp_ishift = np.fft.ifftshift(lp_shift)
lp_img = np.abs(np.fft.ifft2(lp_ishift))
cv2.imshow("Low Pass Filtered", np.uint8(lp_img))
cv2.waitKey(0)

# b) High Pass Filter in frequency domain
mask_hp = np.ones((rows, cols), np.uint8)
cv2.circle(mask_hp, (ccol, crow), r, 0, thickness=-1)
hp_shift = dft_shift * mask_hp
hp_ishift = np.fft.ifftshift(hp_shift)
hp_img = np.abs(np.fft.ifft2(hp_ishift))
cv2.imshow("High Pass Filtered", np.uint8(hp_img))
cv2.waitKey(0)

# c) Apply IFFT to reconstruct image
reconstructed = np.fft.ifft2(np.fft.ifftshift(dft_shift))
reconstructed = np.abs(reconstructed)
cv2.imshow("Reconstructed (IFFT)", np.uint8(reconstructed))
cv2.waitKey(0)
cv2.destroyAllWindows()`,
  },
  {
    id: 10,
    title: "Edge Detection",
    language: "Python",
    filename: "dip_program_10.py",
    description:
      "Edge detection using Laplacian operator on a grayscale image to detect intensity transitions and boundaries.",
    categories: ["Edge Detection"],
    code: `import cv2
import numpy as np

img = cv2.imread("Cartoon.jpg", cv2.IMREAD_GRAYSCALE)
cv2.imshow("Original image", img)
cv2.waitKey(0)

# Laplacian Edge Detection
lap = cv2.Laplacian(img, cv2.CV_64F)
lap_abs = cv2.convertScaleAbs(lap)

cv2.imshow("Edges (Laplacian)", lap_abs)
cv2.waitKey(0)
cv2.destroyAllWindows()`,
  },
  {
    id: 11,
    title: "Morphological Operations (Erosion & Dilation)",
    language: "Python",
    filename: "dip_program_11.py",
    description:
      "Morphological image processing operations: erosion (shrinks bright regions) and dilation (expands bright regions) using a 5×5 rectangular kernel.",
    categories: ["Morphological Operations"],
    code: `import cv2
import numpy as np

img = cv2.imread('Cartoon.jpg', 0)
kernel = np.ones((5, 5), np.uint8)

# Erosion
erode_img = cv2.erode(img, kernel, iterations=1)

# Dilation
dil_img = cv2.dilate(img, kernel, iterations=1)

cv2.imshow("Original image", img)
cv2.waitKey(0)

cv2.imshow("After Erosion", erode_img)
cv2.waitKey(0)

cv2.imshow("After Dilation", dil_img)
cv2.waitKey(0)
cv2.destroyAllWindows()`,
  },
];

export const dipCategories = [
  "All Programs",
  "Image I/O",
  "Point Processing",
  "Arithmetic Operations",
  "Logical Operations",
  "Histogram Processing",
  "Geometric Transforms",
  "Noise Reduction",
  "Spatial Filtering",
  "Frequency Filtering",
  "Edge Detection",
  "Morphological Operations",
];
