import React, { ReactElement } from "react";
import {Table} from 'antd'
import 'antd/dist/antd.css';
import { RepoInfo } from "./data.service";

interface RepoTableComponentProps {
  data: RepoInfo[];
}

export function RepoTableComponent({ data }:RepoTableComponentProps):ReactElement {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  {
      title: 'Watchers',
      dataIndex: 'watchers',
      key: 'watchers',
    },
    {
      title: 'Forks',
      dataIndex: 'forks',
      key: 'forks',
    },
    {
      title: 'Open Issues',
      dataIndex: 'issues',
      key: 'issues',
    }]


  return (
    <Table dataSource={data} columns={columns} />
  );
}
