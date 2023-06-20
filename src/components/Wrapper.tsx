import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

type Props = {
    children: JSX.Element
}

const Wrapper = ({children}: Props) => {
  return (
      <>
          <Header />
          <main>
              {children}
          </main>
          <Footer />
      </>
  )
}

export default Wrapper;