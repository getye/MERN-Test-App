import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchSongs, 
  updateSong, 
  deleteSong,
  searchSongs
 } from '../services/songActions.ts';
import styled from '@emotion/styled';
import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 5%;
  width: 95%;
  margin-left: 5%;
  align-items: flex-start;
`;

const TableContainer = styled.div`
  margin-top: 5px;
  width: 80%;
  align-items: center;
`;


const InputSearch = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 45%;
  margin-left: 50%;
  background-color: #C0C0C0;
`;

const SeacrhContainer = styled.form`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Table = styled.table`
  border: 1px solid;
  text-align: center;
  padding: 10px;
  width: 100%;
`;

const TableHeader = styled.thead`
  background-color: #00008B;
  color: white;
`;

const TableRow = styled.tr`
  background-color: #C0C0C0;
  height: 30px;
`;

const TableHead = styled.th`
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  background-color: #808080;
`;

const UpdateButton = styled.button`
  background-color: #0000FF;
  color: white;
`;

const DeleteButton = styled.button`
  background-color: #FF0000;
  color: white;
`;

const LatestSongContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: auto;
    padding: 10px;
`;

const LatestSongUpdateContainer = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
`;

const LatestSongDeleteContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin-top: 5px;
`;

const Box = styled.div`
  margin-top: 5px;
  width: 80%;
  margin-left:20%;
  align-items: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 80%;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 85%;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  width: 80px;
  margin-left:30%;
`;

const UpdateSongForm = ({ song, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: song.title,
    artist: song.artist,
    album: song.album,
    genre: song.genre,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateSong(song._id, formData)); // Use song._id for update
    onClose();
  };


  return (
    <Box>
    <FormContainer onSubmit={handleSubmit}>
      
      <Label htmlFor="title">Title:</Label>
        <Input type="text" id="title" name="title" required value={formData.title} onChange={handleChange} />

        <Label htmlFor="artist">Artist:</Label>
        <Input type="text" id="artist" name="artist" required value={formData.artist} onChange={handleChange} />
  
        <Label htmlFor="album">Album:</Label>
        <Input type="text" id="album" name="album" required value={formData.album} onChange={handleChange} />
   
        <Label htmlFor="genre">Genre:</Label>
        <Select id="genre" name="genre" required value={formData.genre} onChange={handleChange}>
          <option value="">Select Genre</option>
          {['Tizeta', 'Ambasel', 'Bati', 'Anchihoye'].map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </Select>
      <Button type="submit">Update</Button>
    </FormContainer>
    </Box>
  );
};

Modal.setAppElement('#root'); // Set app element for accessibility

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width:'50%'
  },
};


export const SongList = () => {
  let n =0
  const dispatch = useDispatch();
  //const { songs, loading, error } = useSelector((state) => state.songs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const { songs, filteredSongs, loading, error } = useSelector((state) => state.songs);
  const [searchTerm, setSearchTerm] = useState('');
  const latestSongUpdated = useSelector((state) => state.songs.latestSongUpdated);
  const latestSongDeleted = useSelector((state) => state.songs.latestSongDeleted);

    // Fetch songs only once when the component mounts
    useEffect(() => {
      dispatch(fetchSongs());
    }, [dispatch]);
  
    // Handle search when searchTerm changes
    useEffect(() => {
      if (searchTerm) {
        dispatch(searchSongs(searchTerm));
      }
    }, [dispatch, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    dispatch(searchSongs(e.target.value));
  };

  const displayedSongs = searchTerm ? filteredSongs : songs;


  const handleUpdateSong = (song) => {
    setSelectedSong(song);
    setIsModalOpen(true);
    //dispatch(updateSong(id, updatedSong));
  };

  const handleDeleteSong = (id) => {
    dispatch(deleteSong(id));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
    <TableContainer>
      <SeacrhContainer >
        <InputSearch 
          type="text" 
          placeholder='Search Songs by Title, Artist name, Album or Genre' 
          value={searchTerm}
          onChange={handleSearch}
          />
       </SeacrhContainer>
       <ToastContainer />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Song Title</TableHead>
            <TableHead>Artist Name</TableHead>
            <TableHead>Album</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <tbody>
        {displayedSongs.map((song) => (
          <TableRow key={song._id}>
            <td>{++n}</td>
            <td>{song.title}</td>
            <td>{song.artist}</td>
            <td>{song.album}</td>
            <td>{song.genre}</td>
            <td><UpdateButton onClick={() => handleUpdateSong(song)}>Update</UpdateButton>
            <DeleteButton onClick={() => handleDeleteSong(song._id)}>Delete</DeleteButton> </td>
          </TableRow>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={modalStyles}>
        <UpdateSongForm song={selectedSong} isOpen={isModalOpen} onClose={closeModal} />
      </Modal>

    </TableContainer>
    <LatestSongContainer>
        {latestSongUpdated && (
            <LatestSongUpdateContainer>
              <h5>Latest Updated Song:</h5>
              <p>Title: {latestSongUpdated.title}</p>
              <p>Artist: {latestSongUpdated.artist}</p>
              <p>Album: {latestSongUpdated.album}</p>
              <p>Genre: {latestSongUpdated.genre}</p>
            </LatestSongUpdateContainer> 
          )}
    {latestSongDeleted && (
            <LatestSongDeleteContainer>
              <h5>Latest Deleted Song:</h5>
              <p>Title: {latestSongDeleted.title}</p>
              <p>Artist: {latestSongDeleted.artist}</p>
              <p>Album: {latestSongDeleted.album}</p>
              <p>Genre: {latestSongDeleted.genre}</p>
            </LatestSongDeleteContainer>
          )}
      </LatestSongContainer>

  </Container>
  );
};


