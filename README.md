# Coastal Image Labeler

[![Documentation](https://img.shields.io/badge/Documentation-Click%20Me-brightgreen)](
https://uncg-daisy.github.io/Coastal-Image-Labeler/)
[![Last Commit](https://img.shields.io/github/last-commit/UNCG-DAISY/Coastal-Image-Labeler)](
https://github.com/UNCG-DAISY/Coastal-Image-Labeler/commits/master)
[![DOI](https://zenodo.org/badge/226252747.svg)](https://zenodo.org/badge/latestdoi/226252747)
[![Actions Status1](https://github.com/UNCG-DAISY/Coastal-Image-Labeler/workflows/Unit%20Tests/badge.svg)](https://github.com/UNCG-DAISY/Coastal-Image-Labeler/actions)
[![Actions Status2](https://github.com/UNCG-DAISY/Coastal-Image-Labeler/workflows/Deploy%20Docusaurus/badge.svg)](https://github.com/UNCG-DAISY/Coastal-Image-Labeler/actions)

### It's a labeling tool!

![Labeler](https://github.com/UNCG-DAISY/Coastal-Image-Labeler/blob/master/docs/static/img/labeler.gif)

Labeled images are important for supervised machine learning. The Coastal Image Labeler is focused on easily accommodating multiple users labeling the same images to ensure 
consensus for (potential ambiguous) discipline-specific labels. This tool allows us to crowdsource the development of a labeled image dataset that is relevant for coastal 
scientists.

The labeler is deployed here: [https://coastalimagelabeler.science/](https://coastalimagelabeler.science/). You can log on and start labeling post Hurricane images collected by [NOAA NGS](https://storms.ngs.noaa.gov/).

You can check out the Coastal Image Labeler documentation for more info: 
[![Documentation](https://img.shields.io/badge/Documentation-Click%20Me-brightgreen)](
https://uncg-daisy.github.io/Coastal-Image-Labeler/)

### Code of Conduct

We hope to foster an inclusive and respectful environment surrounding the contribution and discussion of our project.
Make sure you understand our [**Code of Conduct**](https://Coastal-Image-Labeler.readthedocs.io/en/latest/code_of_conduct/).

### Projects using the Labeler:

#### Papers:

An Active Learning Pipeline to Detect Hurricane Washover in Post-Storm Aerial Images: [![Earth ArXiv Preprint
DOI](https://img.shields.io/badge/%F0%9F%8C%8D%F0%9F%8C%8F%F0%9F%8C%8E%20EarthArXiv-doi.org%2F10.31223%2FX5JW23-%23FF7F2A)](https://doi.org/10.31223/X5JW23)

Labeling Poststorm Coastal Imagery for Machine Learning: Measurement of Interrater Agreement: https://doi.org/10.1029/2021EA001896

#### Data Releases:

Labels for Hurricane Florence imagery: 343 images, labeled via consensus, [available via figshare](https://doi.org/10.6084/m9.figshare.11604192.v1).

Labels for Hx Florence, Hx Michael and Hx Isaias imagery:
- v1 (300 images; 2.1k labels): [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.4272064.svg)](https://doi.org/10.5281/zenodo.4272064)
- v1.1 (900 images; 4.5k labels): [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.4541480.svg)](https://doi.org/10.5281/zenodo.4541480)
- v1.2: (1500 images; 6.2k labels) : [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.4694325.svg)](https://doi.org/10.5281/zenodo.4694325)
- v1.3: (1500 images; 6.2k labels; 100 image quadrants (smaller scale) w/ 400 labels): [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.4967050.svg)](https://doi.org/10.5281/zenodo.4967050)
- v1.4: (1500 images; 6.2k labels; 100 image quadrants (smaller scale) w/ 400 labels; 100 images labeled by noncoastal experts - 400 labels): [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.5172799.svg)](https://doi.org/10.5281/zenodo.5172799)

You can merge these labels with post-storm images, which can be downloaded from [NOAA NGS](https://storms.ngs.noaa.gov/) or using [this nifty python command line downloading tool](https://github.com/UNCG-DAISY/psi-collect). We are using these labeled images to [detect washover](https://github.com/UNCG-DAISY/WashoverML).
 
