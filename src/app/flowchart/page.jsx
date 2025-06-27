'use client';
import React from 'react';
import FlowEditor from './FlowEditor'; // ← App.jsx の中身をここに移す

export default function FlowchartPage() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <FlowEditor />
    </div>
  );
}
