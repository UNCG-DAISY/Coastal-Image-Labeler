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
[![BUILD](https://travis-ci.com/UNCG-DAISY/Coastal-Image-Labeler.svg?branch=master)](https://travis-ci.com/UNCG-DAISY/Coastal-Image-Labeler.svg?branch=master)


Generally, the the Coastal Image Labeler is server that provides users with
images to be labeled using a given set of questions. We designed the labeler to
be hosted on a virtual machine, exposed via a web address. Users interactively
label images, with labels written to a database and exported later by an admin.

There are two general roles in this project. 
- First, an admin — who controls
uploading of images, developing questions for the labeler to ask, assigning
roles to users, managing the VM host of the project, and exporting data from
the database. 
- Second, a labeler — who logs onto the server and labels images.

The Coastal Image Labeler Documentation is focused on:
- Describing the goals of the project and our [Code of Conduct](code_of_conduct.md).
- Documenting the underlying source code for the labeling tool and how to
deal with any admin tasks — see the [Code Documentation](code_documentation/overview.md) section.
- Documenting how to interact with the labeling tool as a User — see the [User Documentation](user_documentation/overview.md) section.

## Project Goals

- The Coastal Image Labeler (CILabel) is designed to collaboratively label
coastal images and then provide these labeled images as open data (FAIR) for
general community use.

- **Why labeling images?**
    - Labeled images are important for supervised machine learning research. There are
    many well known labeled image databases (e.g., [ImageNet](http://www.image-net.org)),
    but these existing databases tend to focus on general features (e.g., cats, dogs, horses, etc.). Our goal with this project is to develop a discipline-specific
    database of labeled images that is relevant for coastal scientists.

- **Why not use an existing tool for labeling?**  
    - Many good labeling tools already exist, but our goal with this project is to
    create a tool for *collaboratively* labeling coastal images. Additionally,
    we wanted a tool to easily accommodate multiple users labeling a single
    images (to ensure correct labeling via consensus).

- The Coastal Image Labeler Documentation is focused on:
    - Describing the goals of the project and our [Code of Conduct](code_of_conduct.md).
    - Documenting the underlying source code for the labeling tool — see the [Code Documentation](code_documentation/overview.md) section.
    - Documenting how to interact with the labeling tool as a User — see the [User Documentation](user_documentation/overview.md) section.


