/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders, deleteOrder } from "../actions/orderActions";
import { Link } from "react-router-dom";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrder(id));
      deleteWindow();
    }
  };

  function deleteWindow() {
    window.location.reload();
    alert("Order Has Been Deleted");
  }

  const TabComponent = () => {
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabIndex) => {
      setActiveTab(tabIndex);
    };

    const filterDelivered = orders.filter(
      (order) => order.isDelivered === true
    );

    const filterNotDelivered = orders.filter(
      (order) => order.isDelivered === false
    );

    return (
      <div className="mt-4 x-auto ">
        <div className="flex border-b border-gray-300">
          <TabButton
            tabIndex={1}
            isActive={activeTab === 1}
            onClick={() => handleTabClick(1)}
          >
            <span className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Not Delivered
            </span>
          </TabButton>
          <TabButton
            tabIndex={2}
            isActive={activeTab === 2}
            onClick={() => handleTabClick(2)}
          >
            <span className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Delivered
            </span>
          </TabButton>
        </div>
        <div className="mt-4">
          {activeTab === 1 && (
            <>
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterNotDelivered.map((order) => (
                    <tr key={order._id}>
                      <Link to={`/order/${order._id}`}>
                        <td className="hover:cursor-pointer hover:underline">
                          {order._id}
                        </td>
                      </Link>
                      <td>{order.user && order.user.name}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>${order.totalPrice}</td>
                      <td>
                        <Link to={`/order/${order._id}`}>
                          <Button className="px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
                            Details
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(order._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
          {activeTab === 2 && (
            <>
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>DELIVERED ON</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterDelivered.map((order) => (
                    <tr key={order._id}>
                      <Link to={`/order/${order._id}`}>
                        <td className="hover:cursor-pointer hover:underline">
                          {order._id}
                        </td>
                      </Link>
                      <td>{order.user && order.user.name}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>${order.totalPrice}</td>
                      <td>
                        {order.isDelivered &&
                          order.deliveredAt.substring(0, 10)}
                      </td>
                      <td>
                        <Link to={`/order/${order._id}`}>
                          <Button className="px-2 py-2 mr-1 text-lg text-white bg-blue-500 border-0 rounded focus:outline-none hover:bg-blue-600">
                            Details
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          className="px-2 py-2 text-lg text-white bg-red-500 border-0 rounded focus:outline-none hover:bg-red-600"
                          onClick={() => deleteHandler(order._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </div>
      </div>
    );
  };

  const TabButton = ({ tabIndex, isActive, onClick, children }) => {
    const activeClasses = isActive ? "border-b-2 border-blue-500" : "";

    return (
      <button
        className={`py-2 px-4 mx-2 font-semibold focus:outline-none ${activeClasses}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  // const filterDelivered = orders.filter((order) => order.isDelivered === true);
  // const filterNotDelivered = orders.filter(
  //   (order) => order.isDelivered === false
  // );

  return (
    <>
      <h1 className="mb-3 text-3xl font-medium">Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        // If an order isDelivered is true then show it in a tab. For the other orders, show them in a different tab using Headless UI.

        <TabComponent />

        // <Table striped bordered hover responsive className="table-sm">
        //   <thead>
        //     <tr>
        //       <th>ID</th>
        //       <th>USER</th>
        //       <th>DATE</th>
        //       <th>TOTAL</th>
        //       <th>DELIVERED</th>
        //       <th></th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {orders.map((order) => (
        //       <tr key={order._id}>
        //         <Link to={`/order/${order._id}`}>
        //           <td className="hover:cursor-pointer hover:underline">
        //             {order._id}
        //           </td>
        //         </Link>
        //         <td>{order.user && order.user.name}</td>
        //         <td>{order.createdAt.substring(0, 10)}</td>
        //         <td>${order.totalPrice}</td>
        //         <td>
        //           {order.isDelivered ? (
        //             order.deliveredAt.substring(0, 10)
        //           ) : (
        //             <i className="fas fa-times" style={{ color: "red" }}></i>
        //           )}
        //         </td>
        //         <td>
        //           <Link to={`/order/${order._id}`}>
        //             <Button className="text-white bg-black btn-sm hover:bg-gray-700">
        //               Details
        //             </Button>
        //           </Link>
        //           <Button
        //             variant="danger"
        //             className="bg-red-900 btn-sm hover:bg-red-800"
        //             onClick={() => deleteHandler(order._id)}
        //           >
        //             <i className="fas fa-trash"></i>
        //           </Button>
        //         </td>
        //       </tr>
        //     ))}
        //   </tbody>
        // </Table>
      )}
    </>
  );
};

export default OrderListScreen;
