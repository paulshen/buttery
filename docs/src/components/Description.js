import React from 'react';

export const Section = (props) => <div {...props} style={Section.Styles} />;
Section.Styles = {
  marginBottom: '32px',
};

export const Header = (props) => <div {...props} style={Header.Styles} />;
Header.Styles = {
  fontSize: '20px',
  fontWeight: 400,
  letterSpacing: '0.8px',
  marginBottom: '16px',
};

export const Paragraph = (props) => <div {...props} style={Paragraph.Styles} />;
Paragraph.Styles = {
  fontSize: '14px',
  marginBottom: '16px',
};

export const InlineCode = (props) => <span {...props} style={InlineCode.Styles} />;
InlineCode.Styles = {
  backgroundColor: '#f0f0f0',
  fontFamily: 'Inconsolata',
  fontSize: '15px',
};

export const Table = (props) => <table style={Table.Styles}><tbody {...props} /></table>;
Table.Styles = {
  fontSize: '14px',
};
