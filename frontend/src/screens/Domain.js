import React from "react";

const Domain = () => {
  return (
    <>
      <h1 className="text-3xl font-black">Domain Name</h1>
      <p className="text-xl font-medium ">
        Purchase or Renew your Domain Name here
      </p>
      <p className="mb-3 text-sm font-medium text-slate-400">
        * Domain names is the .com, .net, .org, etc. that you type in the search
        bar for example creativeduo.net
      </p>

      <stripe-pricing-table
        pricing-table-id="prctbl_1NUceoImEZowwqFqbRg6quVr"
        publishable-key="pk_live_51GnfhfImEZowwqFqfcxpJD3vJEGHCM92u6BWrhoDnnJUODHaAduHFZQOtAJ672aWLurbIUDY59Bonte8O2jyHWcm00N1HTOrcz"
      ></stripe-pricing-table>
    </>
  );
};

export default Domain;
