# Changelog

## 0.1.0-alpha - 2018-03-29
- initial commit
- features
  - Post
    - Pagination
    - Categories
    - Tags
    - Search
    - Put React Application into post
    - Put Tweet into post
    - Draft (set `hide` to `true`)
  - Portfolio
  - Resume

## 0.1.1-alpha - 2018-04-03
- support mobile version

## 0.1.2-alpha - 2018-04-03
- update `READEME.md`
- customize `404` page
- add `min-height` to contents wrapper

## 0.1.3 - 2018-04-04
- add image to post
- add copy button in post
- add `border-radius` to profile image
- fix card UI (tags are overflowed)
- improve post readablity
- move logics for rendering tweets & components into `redux-saga`

## 0.1.4 - 2018-04-05
- fix ui bug in production mode

## 0.1.5 - 2018-04-06
- remove `height: 100vh;`

## 0.1.6 - 2018-04-14
- fix lint
- add husky for hooking commit

## 0.1.7 - 2018-04-22
- fix bug (related with `styled-components`)
- change logics for adding image into post
- add `react-helmet` into some pages
- change some styles
  - add font(`Inconsolata`) for `<code>`'s `font-family`

## 0.1.9 - 2018-04-22
- fix bug (post's html)
- remove console
- change eslint rules

## 0.2.0 - 2018-07-08
- migrate `gatsby` into `v2 beta` (from `v2 alpha`)
  - add `gatsby` with specific `version` into `peerDependencies`
- use `css` instead of `less`
- update `dependencides`
  - `babel`, `redux`, `react` etcetera

## 0.2.0-1 - 2018-07-22
- add `LICENCE.md`

## 0.2.1 - 2018-08-10
- update `gatsby` to use `Link` in `gatsby` instead of `gatsby-link` ((ISSUE 8)[https://github.com/wonism/gatsby-advanced-blog/issues/8])
- remove all `css`s and add styles into `Styled Components`. ((ISSUE 9)[https://github.com/wonism/gatsby-advanced-blog/issues/9])
- fix SSR ((ISSUE 9)[https://github.com/wonism/gatsby-advanced-blog/issues/9])
- update `.eslintrc` to change some rules

## 0.2.2 - 2018-08-24
- fix issue that is related with media query for print ((ISSUE 11)[https://github.com/wonism/gatsby-advanced-blog/issues/11])

## 0.2.3 - 2018-09-26
- update `gatsby` version (`v2.0.8`)
