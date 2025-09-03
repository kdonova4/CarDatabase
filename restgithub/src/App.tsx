
import { useState } from 'react'
import './App.css'
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-theme-material.css'
import type { ColDef } from 'ag-grid-community';
// Import AG Grid module system and the modules you want
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import  type { ICellRendererParams } from 'ag-grid-community';

// Register the modules you want to use (AllCommunityModules includes everything in Community edition)
ModuleRegistry.registerModules([ AllCommunityModule ]);

type Repository = {
  id: number;
  full_name: string;
  html_url: string;
};

function App() {
  const [keyword, setKeyword] = useState('');
  const [repodata, setRepoData] = useState<Repository[]>([])

  const [columnDefs] = useState<ColDef[]>([
    {field: 'id', sortable: true, filter: true},
    {field: 'full_name', sortable: true, filter: true},
    {field: 'html_url', sortable: true, filter: true},
    {
      headerName: 'Actions',
      field: 'full_name',
      cellRenderer: (params: ICellRendererParams) => (
        <button
          onClick={() => alert(params.value)}>
          Press Me
        </button>
      ),
    }
  ])

  const handleClick = () => {
    axios.get<{ items: Repository[] }> (`https://api.github.com/search/repositories?q=${keyword}`)
      .then(response => setRepoData(response.data.items))
      .catch(err => console.error(err))
  }

  return (
    <>
      <input
      value={keyword}
      onChange={e => setKeyword(e.target.value)}
      />
      <button onClick={handleClick}>Fetch</button>

      <div className="ag-theme-material" style={{height: 500, width: 850}}>
        <AgGridReact 
          rowData={repodata}
          columnDefs={columnDefs}  pagination={true} paginationPageSize={20}
        />
      </div>    
  </>
  )
}

export default App
