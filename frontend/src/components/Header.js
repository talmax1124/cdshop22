/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState, Fragment } from "react";
import { Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";
import { Transition, Menu } from "@headlessui/react";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
  };

  // Make the use of the opensearch function to make it show and unshow the search bar

  const [open, setOpen] = useState(false);

  const openSearch = () => {
    setOpen(true);
  };

  // Close the search bar using the button or clicking enter
  const closeSearch = () => {
    setOpen(false);
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === ["Enter", "Return"]) {
      closeSearch();
    }
  });

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
                  <Nav.Link>Shop</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={openSearch} className="search-big">
                  Search
                </Nav.Link>
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fas fa-cart-shopping"></i> (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </Nav.Link>
                </LinkContainer>

                {userInfo ? (
                  <>
                    <div>
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="inline-flex w-full rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            <span className="mr-2">
                              <i className="fas fa-user mr-1"></i>{" "}
                              {userInfo.name}
                            </span>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hover:no-underline z-[1000000000000]">
                            <div className="px-1 py-1 ">
                              <Link to="/profile">
                                <Menu.Item>
                                  <button className=" text-black mt-2 mb-2 hover:bg-slate-300 group flex w-full items-center rounded-md px-2 py-2 text-sm">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-6 h-6 mr-2"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                    </svg>
                                    Profile
                                  </button>
                                </Menu.Item>
                              </Link>
                              <Menu.Item>
                                <button
                                  className=" text-black mt-2 mb-2 hover:bg-slate-300 group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                  onClick={logoutHandler}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 mr-2"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                    />
                                  </svg>
                                  Logout
                                </button>
                              </Menu.Item>
                            </div>
                            {userInfo && userInfo.isAdmin && (
                              <>
                                <div className="px-1 py-1">
                                  <h1 className="ml-2 mt-2 mb-2">Admin</h1>
                                  <Link to="/admin/userlist">
                                    <Menu.Item>
                                      <button className=" text-black mt-2 mb-2 hover:bg-slate-300 group flex w-full items-center rounded-md px-2 py-2 text-sm">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className="w-6 h-6 mr-2"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                          />
                                        </svg>
                                        Users
                                      </button>
                                    </Menu.Item>{" "}
                                  </Link>

                                  <Link to="/admin/productlist">
                                    <Menu.Item>
                                      <button className=" text-black mt-2 mb-2 hover:bg-slate-300 group flex w-full items-center rounded-md px-2 py-2 text-sm">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="currentColor"
                                          className="w-6 h-6 mr-2"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                                          />
                                        </svg>
                                        Products
                                      </button>
                                    </Menu.Item>
                                  </Link>

                                  <Link to="/admin/orderlist">
                                    <Menu.Item>
                                      <button className=" text-black mt-2 mb-2 hover:bg-slate-300 group flex w-full items-center rounded-md px-2 py-2 text-sm">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="currentColor"
                                          className="w-6 h-6 mr-2"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                          />
                                        </svg>
                                        Orders
                                      </button>
                                    </Menu.Item>
                                  </Link>

                                  <Link to="/admin/articlelist">
                                    <Menu.Item>
                                      <button className=" text-black mt-2 mb-2 hover:bg-slate-300 group flex w-full items-center rounded-md px-2 py-2 text-sm">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="currentColor"
                                          className="w-6 h-6 mr-2"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                          />
                                        </svg>
                                        Articles
                                      </button>
                                    </Menu.Item>
                                  </Link>
                                </div>
                              </>
                            )}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
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
        {/* Add the div to show and close to use the open */}
        {open ? (
          <div className="p-3 bg-gray-800 flex justify-center items-center flex-col">
            {" "}
            <Route
              render={({ history }) => (
                <SearchBox className="mt-3 text-[1.9em]" history={history} />
              )}
            />
            <button
              onClick={closeSearch}
              className="bg-emerald-500 px-4 py-2 rounded-md mt-3 font-medium text-black font-2xl hover:bg-emerald-400 mb-3"
            >
              Close Search Bar
            </button>
          </div>
        ) : (
          <></>
        )}
      </header>
    </>
  );
};

export default Header;
