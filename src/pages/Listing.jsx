import { Button, message, Popconfirm, Space, Table } from "antd";
import { useState, useEffect } from "react";
import useSupabaseClient from "../backend/supabase/supabase";
import "@/assets/style/pages/listing.css";
import { useAuth } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Listing = () => {
  const [properties, setProperties] = useState();
  const supabase = useSupabaseClient();
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // fetch properties
  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("property_id, price, state, property_type, address")
        .eq("seller_id", userId);
      if (error) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
        return;
      }
      //   format fetching data to match table
      const formattedProperties = data?.map((property) => ({
        key: property.property_id,
        property_type: property.property_type,
        price: property.price,
        state: property.state,
        address: property.state,
      }));

      setProperties(formattedProperties);
    } catch (err) {
      console.error("Error fetching data from Supabase:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (supabase && userId) {
      fetchProperties();
    }
  }, [supabase, userId]);

  // Table delete function
  const confirm = async (propertyId) => {
    setDeleting(true);
    try {
      await supabase.from("properties").delete().eq("property_id", propertyId);
      console.log("Property deleted successfully");

      message.success("Property deleted successfully");
      // Re-fetch properties after deletion
      fetchProperties();
    } catch (err) {
      console.error("Error deleting property:", err.message);
    } finally {
      setDeleting(false);
    }
  };

  // table header
  const columns = [
    {
      title: "Property id",
      key: "property_id",
      dataIndex: "key",
    },
    {
      title: "Property Type",
      dataIndex: "property_type",
      key: "property_type",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Link
            to={`/MyProperty/edit/${record.key}`}
            className="text-gray-600 hover:text-indigo-500"
            aria-label="editProperty"
          >
            <Button color="primary" variant="solid">
              Edit
            </Button>
          </Link>

          <Popconfirm
            title="Delete the property"
            description="Are you sure to delete this property?"
            onConfirm={() => confirm(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger loading={deleting}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="listing px-40 mt-14">
      <h1 className="font-extrabold text-3xl text-center text-white bg-violet-700 rounded-lg px-16 py-5 mb-10">
        My Properties
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Table dataSource={properties} columns={columns} />
      )}
    </div>
  );
};

export default Listing;
