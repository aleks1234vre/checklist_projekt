const Welcome = () => {
  return (
        <>
      <div>
          {localStorage.getItem('hasCookie') ? (
              <div>  <section className="py-5 text-center container">
                  <div className="row py-lg-5">
                      <div className="col-lg-6 col-md-8 mx-auto">
                          <h1 className="fw-light">Welcome</h1>
                          <p className="lead text-body-secondary">Welcome to your personal notes and task website!! </p>
                          <p className="lead text-body-secondary">You can start off by making a new task/note or editing/finishing an existing one</p>

                      </div>
                  </div>
              </section>
              </div>
          ) : (
              <div>  <section className="py-5 text-center container">
              <div className="row py-lg-5">
              <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">Welcome</h1>
              <p className="lead text-body-secondary">Welcome to your personal notes and task website!! </p>
              <p className="lead text-body-secondary">If you want to start with creating a new task or note, please register or login!</p>

                  <button style={{ marginLeft: '13px' }} className="button_bigger"  onClick={() => (window.location.href = "/login")}>
                      Create a task!
                  </button>

              </div>
              </div>
              </section>
              </div>
          )}

      </div>
            </>
  )
}

export default Welcome;