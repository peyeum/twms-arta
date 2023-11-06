const FONT_FAMILY = 'font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";'
const HEADER_CLASSNAME = 'print-laporan-header'

const createHeaderHtml = (title, subtitle) => (`
  <span class='${HEADER_CLASSNAME}'>
    <span>${title}</span>
    <span>${subtitle}</span>
  </span>
`)

const createHeaderStyle = () => (`
  .${HEADER_CLASSNAME} {
    ${FONT_FAMILY}
    font-size: 1.25rem;
    font-weight: 500;
    width: 100%;
    display: flex;
    gap: .5rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }
`)

export const createPrintStyle = (title, subtitle) => [
  createHeaderHtml(title, subtitle),
  createHeaderStyle(),
]