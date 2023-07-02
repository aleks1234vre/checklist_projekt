const Footer = () => {
  return (
      <>
          <footer className="text-body-secondary py-5">
              <div className="container">
                  <p style={{paddingTop:"50%", position:"fixed", bottom:"5%",right:"2%"}} className="float-end mb-1">
                      <a href="#">Back to top</a>
                  </p>
                  <p style={{paddingTop:"21.2%"}}>&copy; {new Date().getFullYear()} MyTasks. All rights reserved.</p>
                  <p style={{paddingBottom:"19%"}} className="mb-0">New to Bootstrap? <a href="/">Visit the homepage</a> or read our <a
                      href="/docs/5.3/getting-started/introduction/">getting started guide</a>.</p>
              </div>
          </footer>
      </>
  )
}

export default Footer;