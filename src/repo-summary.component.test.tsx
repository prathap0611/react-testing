import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from "enzyme"

describe("Test Parent Component", () => {
  const repoTableComponentMock = jest.fn().mockImplementation(() => (<div></div>));
  jest.doMock('./repo-table.component', () => {
    return {
      __esModule: true,
      RepoTableComponent: repoTableComponentMock
    }
  });
  const getReposMock = jest.fn();
  jest.doMock('./data.service', () => {
    return {
      __esModule: true,
      getRepos: getReposMock
    }
  })
  let wrapper: any;

  const RepoSummaryComponent = require("./repo-summary.component").RepoSummaryComponent;

  beforeEach(() => {
    wrapper = mount(<RepoSummaryComponent />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test("Should fetch data on search", async() => {
    const mockData = [{name: 'name1', watchers: 12, forks: 6, issue: 2}];
    getReposMock.mockResolvedValueOnce(mockData);
    await act(async () => {
      wrapper.find('input').simulate('change', { target: { value: 'react' } });
      wrapper.find('button').simulate('click');
    });
    expect(repoTableComponentMock).toHaveBeenLastCalledWith({ data: mockData}, {})
  });
});
