import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Preprocessing</>,
    imageUrl: 'img/undraw_Artificial_intelligence_oyxx.svg',
    description: (
      <>
        Labeled images are important for supervised machine learning research. 
        There are many well known labeled image databases, 
        but these existing databases tend to focus on general features . 
        Our goal with this project is to develop a discipline-specific 
        database of labeled images that is relevant for coastal scientists.
      </>
    ),
  },
  {
    title: <>Tag Collaboratively </>,
    imageUrl: 'img/undraw_files1_9ool.svg',
    description: (
      <>
        We wanted a tool to easily accommodate multiple users labeling a 
        single images to ensure correct labeling via consensus.
      </>
    ),
  },
  {
    title: <>Easy to use</>,
    imageUrl: 'img/undraw_server_q2pb.svg',
    stylesClass:'featureImage2',
    description: (
      <>
        A server that provides users with images to be labeled using a given 
        set of questions. We designed the labeler to be hosted on a virtual 
        machine, exposed via a web address. Users interactively label images, 
        with labels written to a database and exported later by an admin.
      </>
    ),
  },
];

function Feature({imageUrl, title, description,stylesClass}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles[stylesClass] || styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Docs
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
