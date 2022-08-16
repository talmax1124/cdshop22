/* eslint-disable jsx-a11y/anchor-is-valid */
import { React } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <header>
        <Navbar
          className="bg-gray-900"
          variant="dark"
          expand="lg"
          collapseOnSelect
        >
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>CreativeDuoLLC</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Route
                render={({ history }) => (
                  <SearchBox className="ml-auto mr-auto" history={history} />
                )}
              />
              <Nav className="ml-auto">
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i> Cart (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <>
                    <NavDropdown
                      title={userInfo.name}
                      id="username"
                      className="rounded-sm"
                    >
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>

                      {userInfo && userInfo.isAdmin && (
                        <>
                          <hr className="h-[.1em] mt-1 mb-1 bg-black" />
                          <Container>Admin</Container>
                          <LinkContainer to="/admin/userlist">
                            <NavDropdown.Item>Users</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/admin/productlist">
                            <NavDropdown.Item>Products</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/admin/orderlist">
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                          </LinkContainer>
                        </>
                      )}
                    </NavDropdown>
                  </>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
