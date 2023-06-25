#!/usr/bin/python3

# Garrett Abou-Zeid
# x500: abouz009
# March 31, 2022
# CSCI 5541


import sys
import wave
import numpy.fft as fft
import math
import image as im


def sanity_check(wav_file):
    frames = wav_file.getnframes()
    array = []
    while wav_file.tell() < frames:
        bytes = wav_file.readframes(1)
        sample_value = int.from_bytes(bytes, "little", signed=True)
        array.append(sample_value)
    return array


def data_windows(wav_file, samples_per_win, sample_shift):
    sample_list = []

    while wav_file.tell() < wav_file.getnframes():
        start_ptr = wav_file.tell()
        curr_window = []
        window_limit = wav_file.tell() + samples_per_win

        if window_limit > wav_file.getnframes():
            return sample_list

        while wav_file.tell() < window_limit:
            bytes = wav_file.readframes(1)
            sample_value = int.from_bytes(bytes, "little", signed=True)
            curr_window.append(sample_value)

        sample_list.append(curr_window)

        if start_ptr + sample_shift <= wav_file.getnframes():
            wav_file.setpos(start_ptr + sample_shift)
    return sample_list


def hamming_window_func(window_width):
    hamming_window = []
    for i in range(0, window_width):
        value = 0.54 - (0.46 * math.cos((2 * math.pi * i) / window_width))
        hamming_window.append(value)
    return hamming_window


def hamming_func(sample_list, hamming_window):
    for window in sample_list:
        for i in range(0, 400):
            window[i] *= hamming_window[i]


def square_magnitude_func(fft_list):
    freq_mag_list = []
    for window in fft_list:
        new_window = []
        for num in window:
            square_mag = math.sqrt((num.real**2) + (num.imag**2))
            log_square_mag = 10 * math.log(square_mag, 10)
            if log_square_mag < 0:
                log_square_mag = 0
            new_window.append(log_square_mag)
        freq_mag_list.append(new_window)
    return freq_mag_list


def split_list(fft_list_mirrored):
    fft_list = []
    for window in fft_list_mirrored:
        new_window = []
        for i in range(1, 201):
            new_window.append(window[i])
        fft_list.append(new_window)
    return fft_list


def rgb_scale(freq_mag_list):
    min = math.inf
    max = -math.inf
    for window in freq_mag_list:
        for value in window:
            if value < min:
                min = value
            if value > max:
                max = value

    rgb_list = []
    for window in freq_mag_list:
        new_window = []
        for value in window:
            rgb_value = ((value - max) / (min - max)) * 255
            new_window.append(int(rgb_value))
        rgb_list.append(new_window)
    return rgb_list


def main():
    if len(sys.argv) != 2:
        print("Invalid Arguments")
        print("Enter python3 spectrogram.py <.wav file>")
        return

    wav_file = wave.open(sys.argv[1], "r")

    win_size = 25
    win_step = 10

    samples_per_win = int(wav_file.getframerate() / 1000 * win_size)
    sample_shift = int(wav_file.getframerate() / 1000 * win_step)

    sample_list = data_windows(wav_file, samples_per_win, sample_shift)
    window = hamming_window_func(len(sample_list[0]))
    hamming_func(sample_list, window)

    fft_list_mirrored = fft.fft(sample_list)

    fft_list = split_list(fft_list_mirrored)

    freq_mag_list = square_magnitude_func(fft_list)

    rgb_list = rgb_scale(freq_mag_list)
    for i in range(0, len(rgb_list)):
        rgb_list[i].reverse()

    img_window = im.ImageWin("Image Window", len(rgb_list), len(rgb_list[0]))

    spectrogram = im.EmptyImage(len(rgb_list), len(rgb_list[0]))

    for i in range(0, len(rgb_list)):
        for j in range(0, len(rgb_list[0])):
            spectrogram.setPixel(
                i, j, im.Pixel(rgb_list[i][j], rgb_list[i][j], rgb_list[i][j])
            )
    spectrogram.draw(img_window)
    img_window.getMouse()

    wav_file.close()


if __name__ == "__main__":
    main()
