import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchSongs } from '../services/songActions.ts';
import { PieChart, Pie,  Cell } from 'recharts';
import styled from '@emotion/styled';

const MainContainer = styled.div`
  padding-left: 25px;
  padding-top: 5%;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 5%;
  justifyContent: space-between;
`;

const BarChartContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 70%;
  padding-bottom: 5%;
  padding-right: 4%;
`;

const PieChartContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  padding-left: 1%;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 70%;
  padding-bottom: 5%;
  padding-right: 4%;
`;

const TableBox = styled.div`
  box-shadow: 3px 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  padding-left: 1%;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 70%;
  padding-bottom: 5%;
  padding-right: 2%;
  align-items: center;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 3%;
`;

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
  text-align: center;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  text-align: center;
`;

const ChartTitle = styled.h4`
  text-align: center;
`;

const TableTitle = styled.h4`
  text-align: left;
`;

const COLORS = ['#6088FE', '#800080', '#0FBB28', '#cF8042'];

export const Home = () => {
  const { songs } = useSelector((state) => state.songs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  // Aggregate the data
  const totalSongs = songs.length;
  const totalArtists = new Set(songs.map(song => song.artist)).size;
  const totalAlbums = new Set(songs.map(song => song.album)).size;
  const totalGenres = new Set(songs.map(song => song.genre)).size;

  // Data for the bar chart
  const barGraphData = [
    { name: 'Songs', count: totalSongs },
    { name: 'Artists', count: totalArtists },
    { name: 'Albums', count: totalAlbums },
    { name: 'Genres', count: totalGenres },
  ];

    // Aggregate the number of songs in each genre
    const genreCount = songs.reduce((acc, song) => {
      acc[song.genre] = (acc[song.genre] || 0) + 1;
      return acc;
    }, {});
  
    // Convert the genreCount object into an array suitable for recharts
    const data = Object.keys(genreCount).map((genre) => ({
      name: genre,
      value: genreCount[genre],
    }));

    // Aggregate data: number of songs and distinct albums per artist
    const artistData = songs.reduce((acc, song) => {
      if (!acc[song.artist]) {
        acc[song.artist] = { songsCount: 0, albums: new Set() };
      }
      acc[song.artist].songsCount += 1;
      acc[song.artist].albums.add(song.album);
      return acc;
    }, {});
  
    // Convert the artistData object into an array for rendering
    const artistDataArray = Object.keys(artistData).map((artist) => ({
      artist,
      songsCount: artistData[artist].songsCount,
      albumsCount: artistData[artist].albums.size,
    }));

    // Aggregate data: number of songs per album grouped by artist
    const albumData = songs.reduce((acc, song) => {
      const key = `${song.album}_${song.artist}`;
      if (!acc[key]) {
        acc[key] = { album: song.album, artist: song.artist, songsCount: 0 };
      }
      acc[key].songsCount += 1;
      return acc;
    }, {});
  
    // Convert the albumData object into an array for rendering
    const albumDataArray = Object.values(albumData);

  return (
    <MainContainer>
    <ChartContainer>
      <BarChartContainer>
    <ResponsiveContainer width="90%" height={400}>
      <ChartTitle>Number of Songs, Artists, Albums and Genres</ChartTitle>
      <BarChart
        data={barGraphData}
        margin={{
          top: 10, right: 35, left: 20, bottom: 15,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" barSize={20}/>
      </BarChart>
      </ResponsiveContainer>
      </BarChartContainer>
      <PieChartContainer>
    <ResponsiveContainer width="90%" height={400}>
    <ChartTitle>Number of Songs per Genre</ChartTitle>
      <PieChart >
      <Legend layout="vertical" verticalAlign="top" align="right" />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      </ResponsiveContainer>
      </PieChartContainer>
    </ChartContainer>
    <TableContainer>
      <TableBox>

    <TableTitle>Number of Songs and Albums of Artists</TableTitle>
      <Table>
      <thead>
        <tr>
          <TableHeader>Artist</TableHeader>
          <TableHeader>Number of Songs</TableHeader>
          <TableHeader>Number of Albums</TableHeader>
        </tr>
      </thead>
      <tbody>
        {artistDataArray.map((data) => (
          <tr key={data.artist}>
            <TableCell>{data.artist}</TableCell>
            <TableCell>{data.songsCount}</TableCell>
            <TableCell>{data.albumsCount}</TableCell>
          </tr>
        ))}
      </tbody>
    </Table>
    </TableBox>
    <TableBox>
      <TableTitle>Number of Songs per Albums</TableTitle>
          <Table>
            <thead>
              <tr>
                <TableHeader>Album</TableHeader>
                <TableHeader>Artist</TableHeader>
                <TableHeader>Number of Songs</TableHeader>
              </tr>
            </thead>
            <tbody>
              {albumDataArray.map((data, index) => (
                <tr key={index}>
                  <TableCell>{data.album}</TableCell>
                  <TableCell>{data.artist}</TableCell>
                  <TableCell>{data.songsCount}</TableCell>
                </tr>
              ))}
            </tbody>
          </Table>
    </TableBox>
    </TableContainer>
    </MainContainer>
  );
};

