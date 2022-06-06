import { Modal } from '@nextui-org/react'

const extractTwitterUsernameFromUrl = (twitterUrl) => {
  try {
    return twitterUrl.replace(/\/$/, '').replace('https://twitter.com/', '@')
  } catch (e) {
    return ''
  }
}

const cleanUrl = (websiteUrl) => {
  try {
    return websiteUrl
      .replace(/\/$/, '')
      .replace('https://', '')
      .replace('www.', '')
  } catch (e) {
    return ''
  }
}

export default function ToolModal({ visible, setVisible, currentItem }){
  const { name, full_name, description, website, title, logo, github, twitter, crunchbase, funding } = currentItem

  const closeHandler = () => {
    setVisible(false)
  }

  return (
    <Modal
    closeButton
    width="480px"
    aria-labelledby="modal-title"
    open={visible}
    onClose={closeHandler}
    style={{ marginLeft: '16px', marginRight: '16px' }}
  >
    <Modal.Body>
      <div className="pb-6">
        <img
          src={logo}
          width={'48px'}
          height={'48px'}
          className="mb-4"
          alt={title}
        />
        <h1 className="font-bold text-xl mb-2">{full_name || name}</h1>
        <p className="mb-3">{description}</p>
        <div className="text-sm flex flex-col gap-2">
          <div className="detail">
            {cleanUrl(website) && (
              <p>
                <span className="font-semibold block mb-0.5 ">Website</span>{' '}
                <a
                  href={website}
                  target="_blank"
                  className="text-blue-500 hover:font-semibold"
                >
                  {cleanUrl(website)}
                </a>
              </p>
            )}
          </div>
          <div className="detail">
            {extractTwitterUsernameFromUrl(twitter) && (
              <p>
                <span className="font-semibold block mb-0.5 ">Twitter</span>{' '}
                <a
                  href={twitter}
                  target="_blank"
                  className="text-blue-500 hover:font-semibold"
                >
                  {extractTwitterUsernameFromUrl(twitter)}
                </a>
              </p>
            )}
          </div>
          <div className="detail">
            {cleanUrl(github) && (
              <p>
                <span className="font-semibold block mb-0.5 ">GitHub</span>{' '}
                <a
                  href={github}
                  target="_blank"
                  className="text-blue-500 hover:font-semibold"
                >
                  {cleanUrl(github)}
                </a>
              </p>
            )}
          </div>
          <div className="detail">
            {cleanUrl(crunchbase) && (
              <p>
                <span className="font-semibold block mb-0.5 ">
                  Crunchbase
                </span>{' '}
                <a
                  href={crunchbase}
                  target="_blank"
                  className="text-blue-500 hover:font-semibold"
                >
                  {cleanUrl(crunchbase)}
                </a>
              </p>
            )}
          </div>
          <div className="detail">
            {funding && (
              <p>
                <span className="font-semibold block mb-0.5 ">Funding</span>{' '}
                {funding}
              </p>
            )}
          </div>
        </div>
      </div>
    </Modal.Body>
  </Modal>
  )
}