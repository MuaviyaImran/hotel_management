"use client";

import { IContact } from "@/backend/models/contact";
import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";

interface TableData {
  data: {
    rooms: IContact[];
  };
}
const ContactDetails = () => {
  const [contactDetails, setContactDetails] = useState<TableData>();
  const getContactDetails = async () => {
    try {
      const res = await fetch(`/api/getContact`);
      const data = res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getContactDetails().then((res) => {
      setContactDetails(res.ContactDetails);
    });
  }, []);

  const setContactDetail = () => {
    const data: { columns: any[]; rows: any[] } = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Subject",
          field: "subject",
          sort: "asc",
        },
        {
          label: "Message",
          field: "msg",
          sort: "asc",
        },
      ],
      rows: [],
    };
    contactDetails?.forEach((contact, index: number) => {
      data?.rows?.push({
        id: index + 1,
        name: contact.name + " " + contact.surname,
        email: contact.email,
        subject: contact.subject,
        msg: contact.message,
      });
    });
    return data;
  };

  return (
    <div>
      {contactDetails?.length > 0 ? (
        <MDBDataTable
          data={setContactDetail()}
          className="px-3"
          bordered
          striped
          noBottomColumns
          hover
        />
      ) : (
        <h5 className="mt-5 text-center">No Reviews</h5>
      )}
    </div>
  );
};

export default ContactDetails;
