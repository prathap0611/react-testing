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
  const getReposMock1 = jest.fn();
  jest.doMock('./data.service', () => {
    return {
      __esModule: true,
      getRepos: getReposMock,
      getRepos1: getReposMock1
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
    let resolveFn: (value?: unknown) => void;
    const prom = new Promise((res) => {
      resolveFn = res;
    });
    let resolveFn1: (value?: unknown) => void;
    const prom1 = new Promise((res) => {
      resolveFn1 = res;
    });
    getReposMock.mockImplementationOnce(() => prom);
    getReposMock1.mockImplementationOnce(() => prom1);
    // getReposMock.mockResolvedValueOnce(mockData);
    wrapper.find('input').simulate('change', { target: { value: 'react' } });
    wrapper.find('button').simulate('click');
    await act(async () => {
      resolveFn(mockData);
      resolveFn1(mockData);

    });
    expect(repoTableComponentMock).toHaveBeenLastCalledWith({ data: mockData}, {})
  });
});
