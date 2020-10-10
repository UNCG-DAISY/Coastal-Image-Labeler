---
id: indexDoc
title: Coastal Image Labeler
sidebar_label: Introduction
---


## Project Overview

[![Documentation](https://img.shields.io/badge/Documentation-Click%20Me-brightgreen)](
https://uncg-daisy.github.io/Coastal-Image-Labeler/)
[![Last Commit](https://img.shields.io/github/last-commit/UNCG-DAISY/Coastal-Image-Labeler)](
https://github.com/UNCG-DAISY/Coastal-Image-Labeler/commits/master)
[![DOI](https://zenodo.org/badge/226252747.svg)](https://zenodo.org/badge/latestdoi/226252747)
[![Actions Status1](https://github.com/UNCG-DAISY/Coastal-Image-Labeler/workflows/Unit%20Tests/badge.svg)](https://github.com/UNCG-DAISY/Coastal-Image-Labeler/actions)
[![Actions Status2](https://github.com/UNCG-DAISY/Coastal-Image-Labeler/workflows/Deploy%20Docusaurus/badge.svg)](https://github.com/UNCG-DAISY/Coastal-Image-Labeler/actions)


Generally, the Coastal Image Labeler presents users with
coastal images to be labeled using a given set of questions. We designed the labeler to be hosted on a virtual machine and exposed via a web address. Labels provided by the user are written to a database and exported later by a user or admin.

There are two general roles in this project: 
- An Admin — who uploads images to be labeled, developing questions for the labeler to ask, assigning sets of images to users, managing the VM that hosts the project, and exporting data from the database. 
- A Labeler  — who navigates to the website, logs on to the server, labels images, and can download their individual labels.

The Coastal Image Labeler Documentation is focused on:
- Describing the goals of the project and our [Code of Conduct](code_of_conduct.md).
- Documenting the underlying source code for the labeling tool. This is intended to be most useful for an Admin — see the [Code Documentation](code_documentation/overview.md) section.
- The [deployed labeler](https://coastalimagelabeler.science/) — and not this doc site — provides instructions for researchers interested in labeling images.

## Project Goals

- The Coastal Image Labeler is designed to collaboratively label
coastal images and then provide these labeled images as open data (FAIR) for
general community use.

## Some FAQs:

- **Why labeling images?**
    - Labeled images are important for supervised machine learning research. There are many well known labeled image databases (e.g., [ImageNet](http://www.image-net.org)), but these existing databases tend to focus on general features (e.g., cats, dogs, horses, etc.). Our goal with this project is to develop a discipline-specific database of labeled images that is relevant for coastal scientists. 

- **Why not use an existing tool for labeling?**  
    - Many good labeling tools already exist, but our goal with this project is to
    create a tool for collaborative, asynchronous labeling. Additionally,
    we wanted a tool to easily accommodate multiple users labeling a single
    images (to ensure correct labeling via consensus).

- **Isn't this similar to iCOAST from the USGS?**
    - Yes — it is definitely one of the inspirations for this project. The [USGS iCOAST](https://www.usgs.gov/centers/spcmsc/science/icoast-did-coast-change?qt-science_center_objects=0#qt-science_center_objects) project is an example of a labeled coastal database for storm impacts that was labeled collaboratively. We are extending this idea in atleast 2 ways: First, the Coastal Image Labeler does currently host NOAA post-storm images (we have [released some data already](https://doi.org/10.6084/m9.figshare.11604192.v1)), but any image can be loaded and any question set can be created (for example, we have already labeled [wave-scarp interaction images](https://doi.org/10.6084/m9.figshare.12765494.v1), and images of beach state). Second, this project is very closely tied to machine learning — crowdsourcing labels for coastal images to advance ML applications to Coastal science. One clear example of this linkage is — for some image catalogs — the images a user labels are shown to them in a specific order to help the ML algorithm learn samples that are confusing (i.e., [active learning](https://en.wikipedia.org/wiki/Active_learning_(machine_learning))).

