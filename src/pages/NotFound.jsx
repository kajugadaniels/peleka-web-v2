import React from 'react'

const NotFound = () => {
    return (
        <section className="page-404-wrap bg-4">
            <div className="tf-container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="thumds">
                            <img className=" ls-is-cached lazyloaded" data-src="https://creativelayers.net/themes/upskill-html/images/section/404.png" src="https://creativelayers.net/themes/upskill-html/images/section/404.png" alt="" />
                        </div>
                    </div>
                    <div className="col-lg-4 flex items-center">
                        <div className="errors-404-content">
                            <h3>Oops! It looks like you're lost.</h3>
                            <p>
                                The page you're looking for isn't available. Try to search again or use the go to.
                            </p>

                            <a className="tf-btn" href="/">Go Back To Homepage <i className="icon-arrow-top-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NotFound