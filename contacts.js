const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const result = JSON.parse(contacts);
    console.table(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return console.log(contacts.find((contact) => contact.id === contactId));
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const filter = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(filter));
  console.log("Remove contact", contactId);
  return filter;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: String(contacts.length + 1),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return console.log(newContact);
}
module.exports = { listContacts, getContactById, removeContact, addContact };
