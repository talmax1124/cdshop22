/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState, Fragment } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";
import { Dialog, Transition } from "@headlessui/react";

const Header = () => {
  const dispatch = useDispatch();

  const [searchOpen, setSearchOpen] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
  };

  function openModalo() {
    setSearchOpen(true);
  }
  function closeModalo() {
    setSearchOpen(false);
  }

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
              <Transition appear show={searchOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-10"
                  onClose={closeModalo}
                >
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 mb-3 text-gray-900"
                          >
                            Search
                          </Dialog.Title>

                          <Route
                            render={({ history }) => (
                              <SearchBox
                                className="w-[100%] mt-3 text-[1.9em]"
                                history={history}
                              />
                            )}
                          />
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
              <div className="search-small">
                <Route
                  render={({ history }) => (
                    <SearchBox className="ml-auto mr-auto" history={history} />
                  )}
                />
              </div>
              <Nav className="ml-auto">
                <LinkContainer to="/articles">
                  <Nav.Link>Articles</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/products">
                  <Nav.Link>Products</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/cart">
                  <Nav.Link>
                    Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </Nav.Link>
                </LinkContainer>

                {/* <LinkContainer to="#"> */}
                <Nav.Link onClick={openModalo} className="search-big">
                  Search
                </Nav.Link>
                {/* </LinkContainer> */}
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
                          <LinkContainer to="/admin/articlelist">
                            <NavDropdown.Item>Articles</NavDropdown.Item>
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
