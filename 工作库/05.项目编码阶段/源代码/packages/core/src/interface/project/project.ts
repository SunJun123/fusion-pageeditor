/*
 * @Date: 2022-08-01 16:55:07
 * @LastEditors: sunjun
 * @LastEditTime: 2022-10-26 17:20:13
 */
import { IPage, Page } from "./page";

export interface IProject {
  id: number;

  /** 名称 */
  name: string;

  /** 描述 */
  description: string;

  /** 页面 */
  pages: IPage[];
}

export interface ShotKeyItem {
  name: string;
  code: string;
  ctrlKey: boolean;
  handler: () => void;
}

export class Project implements IProject {
  public static create(p?: IProject) {
    const project = new Project();
    if (p) {
      project.id = p.id || project.id;
      project.name = p.name || project.name;
      project.description = p.description || project.description;
      project._pages = p.pages.map((page) => new Page(page));
    } else {
      project.addPage(new Page());
    }
    return project;
  }

  public id: number;

  public name = "New Project";

  public description = "New Project Description";

  private _pages: Page[] = [];

  public get pages() {
    return this._pages.map((p) => p);
  }

  public addPage(page?: Page) {
    this._pages.push(new Page(page));
  }

  public setProjectId(id: number) {
    this.id = id;
  }

  public getPageByIndex(index: number) {
    return this._pages[index];
  }

  public getPageById(id: string) {
    return this._pages.find(item => item.id == id)
  }

  public removePage(page: Page) {
    const index = this._pages.map((item) => item.id).indexOf(page.id);
    if (index >= 0) {
      this._pages.splice(index, 1);
    }
  }

  public insertPage(index: number, page: Page) {
    this._pages.splice(index, 0, page);
  }

  public setCurrentPage(page: Page) {
    this._pages[0] = page;
  }

  public getRecord(): IProject {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      pages: this.pages,
    };
  }
}
