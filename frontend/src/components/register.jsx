
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { addSong } from '../services/songActions.ts';
//import { updateFormField } from '../services/songActions';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5%;
  width: 70%;
  margin-left: 15%;
  align-items: flex-start;
`;

const Box = styled.div`
  margin-top: 5px;
  width: 40%;
  margin-left:10%;
  align-items: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
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

const LatestSongContainer = styled.div`
  width: 45%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
`;

export const MusicForm = () => {
  const dispatch = useDispatch();
  const latestSongAdded = useSelector((state) => state.songs.latestSongAdded);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
  });

  const handleChange = (event) => {
    //const { name, value } = event.target;
    //dispatch(updateFormField({ name, value }));
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  /*
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { title, artist, album, genre };
    dispatch(submitForm(formData));
  }; */

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addSong(formData));
    setFormData({
      title: '',
      artist: '',
      album: '',
      genre: '',
    });
  };

  return (
    <Container>
        <Box>
          <ToastContainer />
        <FormContainer onSubmit={handleSubmit}>
             <h4>Register Songs</h4>
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
      
            <Button type="submit">Register</Button>
        </FormContainer>
      </Box>
        
        {latestSongAdded && (
            <LatestSongContainer>
              <h5>Latest Added Song:</h5>
              <p>Title: {latestSongAdded.title}</p>
              <p>Artist: {latestSongAdded.artist}</p>
              <p>Album: {latestSongAdded.album}</p>
              <p>Genre: {latestSongAdded.genre}</p>
            </LatestSongContainer>
          )}
    </Container>
  );
};


