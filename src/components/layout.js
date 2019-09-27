/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import {Helmet} from "react-helmet";

import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  return (
    <>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Denis Bodnar blog</title>
          <link rel="canonical" href="https:denisbodnar.com" />
      </Helmet>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `2rem`,
        }}
      >
        <h1>{data.site.siteMetadata.title}</h1>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
