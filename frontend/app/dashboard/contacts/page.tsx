"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { Plus, Search, Mail, Phone, Linkedin } from "lucide-react";
import { Contact } from "../../types";
import { useToast } from "../../../hooks/use-toast";

const mockContacts: Contact[] = [
  {
    id: "1",
    jobId: "1",
    name: "Sarah Johnson",
    email: "sarah.j@techcorp.com",
    phone: "+1 (555) 123-4567",
    linkedIn: "linkedin.com/in/sarahjohnson",
    role: "Technical Recruiter",
    workingAt: "TechCorp",
  },
  {
    id: "2",
    jobId: "2",
    name: "Michael Chen",
    email: "mchen@startupx.com",
    phone: "+1 (555) 987-6543",
    linkedIn: "linkedin.com/in/michaelchen",
    role: "Engineering Manager",
    workingAt: "StartupX",
  },
  {
    id: "3",
    jobId: "3",
    name: "Emily Rodriguez",
    email: "emily.r@bigtech.com",
    linkedIn: "linkedin.com/in/emilyrodriguez",
    role: "HR Manager",
    workingAt: "BigTech",
  },
];

const initialNewContact: Partial<Contact> = {
  name: "",
  email: "",
  phone: "",
  linkedIn: "",
  role: "",
  workingAt: "",
};

export default function ContactsPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState(mockContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [newContact, setNewContact] =
    useState<Partial<Contact>>(initialNewContact);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedContact, setEditedContact] =
    useState<Partial<Contact>>(initialNewContact);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddContact = () => {
    const contact: Contact = {
      id: (contacts.length + 1).toString(),
      jobId: "0",
      ...(newContact as any),
    };
    setContacts([...contacts, contact]);
    setNewContact(initialNewContact);
    setIsAddDialogOpen(false);
    toast({
      title: "Contact Added",
      description: "New contact has been added successfully.",
    });
  };

  const hadleEditContact = (contactId: string, editedContact: Contact) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === contactId ? { ...editedContact } : contact
      )
    );
    setIsEditDialogOpen(false);
    setSelectedContact(null);
    toast({
      title: "Contact Updated",
      description: `Your contact has been updated successfully.`,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (contactId: string) => {
    hadleEditContact(contactId, editedContact as Contact);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
          <p className="text-muted-foreground">
            Manage your professional network and recruiter contacts
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Contact</DialogTitle>
              <DialogDescription>
                Enter the details of your new contact
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newContact.name}
                  onChange={(e) =>
                    setNewContact({ ...newContact, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={newContact.role}
                  onChange={(e) =>
                    setNewContact({ ...newContact, role: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workingAt">Working At</Label>
                <Input
                  id="workingAt"
                  value={newContact.workingAt}
                  onChange={(e) =>
                    setNewContact({ ...newContact, role: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newContact.email}
                  onChange={(e) =>
                    setNewContact({ ...newContact, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newContact.phone}
                  onChange={(e) =>
                    setNewContact({ ...newContact, phone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input
                  id="linkedin"
                  value={newContact.linkedIn}
                  onChange={(e) =>
                    setNewContact({ ...newContact, linkedIn: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddContact}>Add Contact</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <div className="relative mb-6">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Working At</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.role}</TableCell>
                  <TableCell>{contact.workingAt || "Unknown"}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {contact.email && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            (window.location.href = `mailto:${contact.email}`)
                          }
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      )}
                      {contact.phone && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            (window.location.href = `tel:${contact.phone}`)
                          }
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                      )}
                      {contact.linkedIn && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            window.open(`https://${contact.linkedIn}`, "_blank")
                          }
                        >
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog
                      open={
                        isViewDialogOpen && selectedContact?.id === contact.id
                      }
                      onOpenChange={(open) => {
                        setIsViewDialogOpen(open);
                        if (!open) setSelectedContact(null);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedContact(contact)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Contact Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Full Name</Label>
                            <p className="mt-1">{contact.name}</p>
                          </div>
                          <div>
                            <Label>Role</Label>
                            <p className="mt-1">{contact.role}</p>
                          </div>
                          {contact.email && (
                            <div>
                              <Label>Email</Label>
                              <p className="mt-1">
                                <a
                                  href={`mailto:${contact.email}`}
                                  className="text-primary hover:underline"
                                >
                                  {contact.email}
                                </a>
                              </p>
                            </div>
                          )}
                          {contact.phone && (
                            <div>
                              <Label>Phone</Label>
                              <p className="mt-1">
                                <a
                                  href={`tel:${contact.phone}`}
                                  className="text-primary hover:underline"
                                >
                                  {contact.phone}
                                </a>
                              </p>
                            </div>
                          )}
                          {contact.linkedIn && (
                            <div>
                              <Label>LinkedIn Profile</Label>
                              <p className="mt-1">
                                <a
                                  href={`https://${contact.linkedIn}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                >
                                  {contact.linkedIn}
                                </a>
                              </p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={
                        isEditDialogOpen && selectedContact?.id === contact.id
                      }
                      onOpenChange={(open) => {
                        setEditedContact(contact);
                        setIsEditDialogOpen(open);
                        if (!open) {
                          setSelectedContact(null);
                          setEditedContact(initialNewContact);
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedContact(contact)}
                        >
                          Edit Contact
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Contact Details</DialogTitle>
                          <DialogDescription>
                            Modify the details for{" "}
                            <strong>{contact.name}</strong>
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Label>Position Title</Label>
                          <Input
                            name="name"
                            value={editedContact.name}
                            onChange={handleChange}
                          />

                          <Label>Email</Label>
                          <Input
                            name="email"
                            value={editedContact.email}
                            onChange={handleChange}
                          />

                          <Label>Phone</Label>
                          <Input
                            name="phone"
                            value={editedContact.phone}
                            onChange={handleChange}
                          />

                          <Label>LinkedIn</Label>
                          <Input
                            name="linkedIn"
                            value={editedContact.linkedIn}
                            onChange={handleChange}
                          />

                          <Label>Role</Label>
                          <Input
                            name="role"
                            value={editedContact.role}
                            onChange={handleChange}
                          />

                          <Label>Working At</Label>
                          <Input
                            name="workingAt"
                            value={editedContact.workingAt}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button
                            variant="outline"
                            onClick={() => setIsEditDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() =>
                              handleSubmit(selectedContact?.id || "")
                            }
                          >
                            Save Changes
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
