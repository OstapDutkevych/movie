import Container from "../Container/Container";
import Navigation from "../Navigation/Navigation";
import s from "./Header.module.css";

const Header = () => {
  return (
    <>
      <header className={s.header}>
        <Container>
          <Navigation />
        </Container>
      </header>
    </>
  );
};

export default Header;
