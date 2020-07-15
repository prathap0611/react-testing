import React, { useState, ReactElement, ChangeEvent, useEffect } from "react";
import { RepoTableComponent } from "./repo-table.component";
import { getRepos, RepoInfo, getRepos1 } from "./data.service";

export class RepoSummaryComponent extends React.Component<{}, {data: RepoInfo[], searchQuery: string}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      searchQuery: ''
    };
  }
   
  updateSearchQuery(e:ChangeEvent<HTMLInputElement>) {
    this.setState({searchQuery: e.target.value});
  }

  async searchAndUpdateRecords() {
    try {
      const data = await getRepos(this.state.searchQuery);
      const data1 = await getRepos1(this.state.searchQuery);
      this.setState({data});
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <div>
          <input type="text" value={this.state.searchQuery} onChange={this.updateSearchQuery.bind(this)} />
          <button onClick={this.searchAndUpdateRecords.bind(this)}>Search</button>
        </div>
        <RepoTableComponent data={this.state.data}/>
      </div>
    );
  }
}
