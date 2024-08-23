/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { space, layout, color } from 'styled-system';


const NavbarContainer = styled.nav(
  css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#00008B',
    color: '#fff',
    position: 'fixed',  // Fix the navbar at the top
    top: '0',           // Position it at the top of the viewport
    width: '98%',      // Make it span the full width
    zIndex: '1000',     // Ensure it's on top of other content
  }),
  space, // Allow styled-system props for spacing
  layout, // Allow styled-system props for layout
  color // Allow styled-system props for colors
);

const NavItem = styled.a(
  css({
    margin: '0 1rem',
    textDecoration: 'none',
    color: '#fff',
    fontSize: '1.1rem',
    '&:hover': {
      color: '#FFD700',
    },
  }),
  space, // Allow styled-system props for spacing
  layout, // Allow styled-system props for layout
  color // Allow styled-system props for colors
);

export const Navbar = () => {
  return (
    <NavbarContainer>
      <div>Song App</div> 
      <div>
        <NavItem href="/">Dashboard</NavItem>
        <NavItem href="/add">Add Song</NavItem>
        <NavItem href="/view">View Song</NavItem>
      </div>
    </NavbarContainer>
  );
};


