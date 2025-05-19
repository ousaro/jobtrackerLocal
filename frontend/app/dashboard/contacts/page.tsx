"use client";

import { useEffect, useState } from "react";
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
import { Plus, Search, Mail, Phone, Linkedin, Link } from "lucide-react";
import { Contact, ContactFormData, SearchResponse } from "../../types";
import { useToast } from "../../../hooks/use-toast";
import { searchByType } from "../../../api/searchApi/searchApi";
import {
  addContact,
  getContactsByIds,
  updateContact,
} from "../../../api/contactApi/contactApi";
import debounce from "lodash.debounce";
import { useAuth } from "../../../context/AuthContext";

export default function ContactsPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [contactFormData, setContactFormData] = useState<ContactFormData>({
    jobId: "",
    name: "",
    email: "",
    phone: "",
    linkedIn: "",
    role: "",
    workingAt: "",
  });
  const [searchResults, setSearchResults] = useState<SearchResponse>(
    {} as SearchResponse
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Adds a new contact via API then refresh list
  const handleAddContact = async () => {
    try {
      await addContact({ ...contactFormData, jobId: user?.id || "" });
      toast({
        title: "Contact Added",
        description: `${contactFormData.name} added successfully!`,
      });
      setIsAddDialogOpen(false);
      setContactFormData({
        jobId: "",
        name: "",
        email: "",
        phone: "",
        linkedIn: "",
        role: "",
        workingAt: "",
      });
      setSearch(""); // clear search and refresh list
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error adding contact.",
        variant: "destructive",
      });
    }
  };

  // Edits the selected contact (by id) then refresh list
  const handleSubmit = async (id: string) => {
    try {
      await updateContact(id, contactFormData);
      toast({
        title: "Contact Updated",
        description: `${contactFormData.name}'s info updated!`,
      });
      setIsEditDialogOpen(false);
      setSelectedContact(null);
      setContactFormData({
        jobId: "",
        name: "",
        email: "",
        phone: "",
        linkedIn: "",
        role: "",
        workingAt: "",
      });
      fetchSearchResults(""); // refresh whole list
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error updating contact.",
        variant: "destructive",
      });
    }
  };

  const fetchSearchResults = async (q: string) => {
    try {
      const res = await searchByType("contacts", q);
      setSearchResults(res);
      const ids = res.results.map((result) => result.id);

      let result: Contact[] = [];
      if (ids.length !== 0) result = await getContactsByIds(ids);

      setContacts(result);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error fetching search results.",
        variant: "destructive",
      });
    }
  };

  const debouncedSearch = debounce((query: string) => {
    fetchSearchResults(query);
  }, 300);

  useEffect(() => {
    debouncedSearch(search);
    return () => debouncedSearch.cancel();
  }, [search]);

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    
    setTimeout(() => setIsDropdownVisible(e.target.value.length > 0), 350); // Show dropdown only when there's a search query after a delay
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle key press event (Enter key)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      fetchSearchResults(search); // Perform search on Enter press
      setIsDropdownVisible(false); // Hide the dropdown after Enter is pressed
    }
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
                <Label>Full Name</Label>
                <Input
                  name="name"
                  value={contactFormData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input
                  name="role"
                  value={contactFormData.role}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Working At</Label>
                <Input
                  name="workingAt"
                  value={contactFormData.workingAt}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={contactFormData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  name="phone"
                  value={contactFormData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label>LinkedIn Profile</Label>
                <Input
                  name="linkedIn"
                  value={contactFormData.linkedIn}
                  onChange={handleChange}
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
          <Input
            placeholder="Search contacts..."
            className="pl-8"
            value={search}
            onKeyDown={handleKeyDown}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          {/* Dropdown for suggestions */}
          {isDropdownVisible &&
            searchResults.results &&
            searchResults.results.length > 0 && (
              <div className="absolute z-10 w-full dark:bg-inherit bg-white border dark:border-black border-gray-200 dark:shadow-black mt-2 rounded-lg shadow-md max-h-60 overflow-y-auto">
                <ul className="divide-y dark:divide-gray-700 divide-gray-100">
                  {searchResults.results.map((result) => (
                    <li key={result.id}>
                     <div className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                          <div className="flex items-center gap-3">
                            <h2
                              className="text-sm font-semibold"
                              dangerouslySetInnerHTML={{
                                __html: result.highlight.fullName,
                              }}
                            ></h2>
                          </div>
                        </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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

            {!isDropdownVisible && contacts.length > 0 && (
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">
                      {contact.name}
                    </TableCell>
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
                              window.open(
                                `https://${contact.linkedIn}`,
                                "_blank"
                              )
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
                          setContactFormData(contact);
                          setIsEditDialogOpen(open);
                          if (!open) {
                            setSelectedContact(null);
                            setContactFormData({
                              jobId: "",
                              name: "",
                              email: "",
                              phone: "",
                              linkedIn: "",
                              role: "",
                              workingAt: "",
                            });
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
                              value={contactFormData.name}
                              onChange={handleChange}
                            />

                            <Label>Email</Label>
                            <Input
                              name="email"
                              value={contactFormData.email}
                              onChange={handleChange}
                            />

                            <Label>Phone</Label>
                            <Input
                              name="phone"
                              value={contactFormData.phone}
                              onChange={handleChange}
                            />

                            <Label>LinkedIn</Label>
                            <Input
                              name="linkedIn"
                              value={contactFormData.linkedIn}
                              onChange={handleChange}
                            />

                            <Label>Role</Label>
                            <Input
                              name="role"
                              value={contactFormData.role}
                              onChange={handleChange}
                            />

                            <Label>Working At</Label>
                            <Input
                              name="workingAt"
                              value={contactFormData.workingAt}
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
            )}
          </Table>
        </div>
      </Card>
    </div>
  );
}
