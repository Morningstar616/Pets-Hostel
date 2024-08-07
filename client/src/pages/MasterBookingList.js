import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faInfoCircle, faEdit, faTrashAlt, faBell } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirm from '../components/popups/DeleteConfirm';
import Notification from '../components/popups/Notification';
import SideBar from '../components/layouts/SideBar';
import '../assets/styles/MasterBookingList.css';

const MasterBookingList = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    // Simulating API call with dummy data
    const fetchData = async () => {
      const dummyData = [
        {
          id: 1,
          bookingDate: '2023-06-27',
          name: 'John Doe',
          mobileNumber: '123-456-7890',
          email: 'johndoe@example.com',
          remarks: 'Example remarks',
        },
        {
          id: 2,
          bookingDate: '2023-07-01',
          name: 'Jane Smith',
          mobileNumber: '987-654-3210',
          email: 'janesmith@example.com',
          remarks: 'Another example remarks',
        },
        {
          id: 3,
          bookingDate: '2023-07-04',
          name: 'Alice Johnson',
          mobileNumber: '555-555-5555',
          email: 'alicejohnson@example.com',
          remarks: 'Some remarks here',
        },
      ];
      setData(dummyData);

      const dummyNotifications = [
        { type: 'birthday', message: 'Buddy\'s birthday is on 2023-07-10' },
        { type: 'event', message: 'Grooming Session on 2023-07-15' },
        { type: 'birthday', message: 'Max\'s birthday is on 2023-07-12' },
        { type: 'event', message: 'Vaccination camp on 2023-07-20' },
      ];
      setNotifications(dummyNotifications);

    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMoreInfo = () => {
    navigate('/booking-details', { state: { editable: false } });
  };

  const handleEdit = () => {
    navigate('/booking-details', { state: { editable: true } });
  };

  const toggleNotificationDialog = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleDelete = (id) => {
    setDeleteId(id); 
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setData(data.filter(item => item.id !== deleteId)); 
    setIsDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };


  return (
    <div className='master-list-container'>
      <SideBar />
      <div className='master-list-content'>
        <div className='master-header-container'>
          <h1>Master Booking List</h1>
          <FontAwesomeIcon 
            icon={faBell} 
            className="header-icon2" 
            onClick={toggleNotificationDialog} 
          />
        </div>
        <div className='search-container2'>
          <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
          <button><FontAwesomeIcon icon={faSearch} /></button>
        </div>
        <div className='table-container2'>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Booking Date</th>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Email</th>
                <th>Remarks</th>
                <th>More Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.bookingDate}</td>
                  <td>{item.name}</td>
                  <td>{item.mobileNumber}</td>
                  <td>{item.email}</td>
                  <td>{item.remarks}</td>
                  <td>
                    <FontAwesomeIcon icon={faInfoCircle} className="table-icon2" onClick={handleMoreInfo} />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faEdit} className="table-icon2" onClick={handleEdit} />
                    <FontAwesomeIcon icon={faTrashAlt} className="table-icon2" onClick={() => handleDelete(item.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DeleteConfirm 
          isOpen={isDialogOpen} 
          onClose={handleCloseDialog} 
          onConfirm={handleConfirmDelete} 
        />
        <Notification 
          isOpen={isNotificationOpen} 
          onClose={toggleNotificationDialog} 
          notifications={notifications} 
        />
      </div>
    </div>
  );
};

export default MasterBookingList;
