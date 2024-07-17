import {  useForm } from "react-hook-form";
import { Button, Modal, Table } from "flowbite-react";
import { addNewContacts, getAllContacts, deleteContacts, updateContacts, getByIdContacts, getAllCountry } from "../service/ContactService";
import { useCallback, useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";


function FormPage() {

  const [countries, setCountries] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [openModal, setOpenModal] = useState(false);



  const fetchData = useCallback(async () => {
    const countriesData = await getAllCountry();
    const contactsData = await getAllContacts();
    setCountries(countriesData);
    setContacts(contactsData);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);




  const { handleSubmit, register, reset } = useForm({
    mode: "onClick",
  });

  const newbtn = () => {
    setSelectedContact(null)
    reset({
      name: "",
      address: "",
      telephone: "",
      mobile: "",
      email: "",
      country: "",
    });
  }


  const deleteBtn = async () => {
 
    if (selectedContact) {
      await deleteContacts(selectedContact.contactId);
      setSelectedContact(null);
      fetchData();
      setOpenModal(false);
      reset({
        name: "",
        address: "",
        telephone: "",
        mobile: "",
        email: "",
        country: "",
      });
      
    }
  }



  const onSubmitContact = async (data) => {
   

    if (!data.contactId) {
    const contactData = {
      name: data.name,
      address: data.address,
      tel: data.telephone,
      mobile: data.mobile,
      email: data.email,
      countryId: Number(data.country),
    };
    addNewContacts(contactData);
    reset({
      name: "",
      address: "",
      telephone: "",
      mobile: "",
      email: "",
      country: "",
    });
  } else {
    const contactData = {
      contactId: selectedContact.contactId,
      name: data.name,
      address: data.address,
      tel: data.telephone,
      mobile: data.mobile,
      email: data.email,
      countryId: Number(data.country),
    };
    updateContacts( selectedContact.contactId,contactData);
    reset({
      name: "",
      address: "",
      telephone: "",
      mobile: "",
      email: "",
      country: "",
    });
  }

  fetchData();
  };


  const handleEdit = async (id) => {
    const updateContact = await getByIdContacts(id);
    reset(updateContact);
    setSelectedContact(updateContact);
   

  }

  return (
    <div className="container border-b  border-gray-200 bg-white p-4 pt-6 dark:border-gray-700 dark:bg-gray-800">
      <form onSubmit={handleSubmit(onSubmitContact)}>
        <div className="mb-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6">
              <label htmlFor="name" className="mb-2 block w-24">
                Name
              </label>
              <input
                {...register("name")}
                type="text"
                id="name"
                required 
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-6">
              <label htmlFor="telephone" className="mb-2 block w-24">
                Telephone
              </label>
              <input
                {...register("telephone")}
                type="text"
                id="telephone"
                
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>


          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-6">
              <label htmlFor="address" className="mb-2 block w-24">
                Address
              </label>
              <textarea
                {...register("address")}
                id="address"
             
                rows="4"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              ></textarea>
            </div>
            <div className="col-span-6">
              <div>
                <label htmlFor="mobile" className="mb-2 block w-24">
                  Mobile
                </label>
                <input
                  {...register("mobile")}
                  type="text"
                  required 
                  id="mobile"
                  className="mb-4 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block w-24">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="text"
                
                  id="email"
                  className="mb-4 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="country" className="mb-2 block w-24">
                  Country
                </label>
                <select
                  id="country"
                  required 
                  className="mb-4 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  name="country" {...register("country")}
                >

                  {countries.map((country) => (
                    <option key={country?.countryId} value={country.countryId}>
                      {country.country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row-reverse">
          <button
            type="button"
            onClick={newbtn}
            className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            New
          </button>

          <button
            type="submit"
            className="mb-2 me-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
          <button
           type="submit"
            className="mb-2 me-2 rounded-lg bg-yellow-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update
          </button>
          <button
            type="button"
            onClick={()=> setOpenModal(true)}
            className="mb-2 me-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Delete
          </button>
          
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteBtn}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

        </div>
      </form>

      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Id</Table.HeadCell>

            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Address</Table.HeadCell>
            <Table.HeadCell>Telephone</Table.HeadCell>
            <Table.HeadCell>Mobile</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Country</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {contacts.map((contact, index) => (
              <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{contact.contactId}</Table.Cell>
                <Table.Cell>{contact.name}</Table.Cell>
                <Table.Cell>{contact.address}</Table.Cell>
                <Table.Cell>{contact.tel}</Table.Cell>
                <Table.Cell>{contact.mobile}</Table.Cell>
                <Table.Cell>{contact.email}</Table.Cell>
                <Table.Cell>
                  {
                    countries.find(country => country.countryId === contact.countryId)?.country || 'Not Found'
                  }
                </Table.Cell>


                <Table.Cell>
                  <a
                    onClick={() => handleEdit(contact.contactId)}

                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default FormPage;
