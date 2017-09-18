import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Blog e2e test', () => {

    let navBarPage: NavBarPage;
    let blogDialogPage: BlogDialogPage;
    let blogComponentsPage: BlogComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Blogs', () => {
        navBarPage.goToEntity('blog');
        blogComponentsPage = new BlogComponentsPage();
        expect(blogComponentsPage.getTitle()).toMatch(/Blogs/);

    });

    it('should load create Blog dialog', () => {
        blogComponentsPage.clickOnCreateButton();
        blogDialogPage = new BlogDialogPage();
        expect(blogDialogPage.getModalTitle()).toMatch(/Create or edit a Blog/);
        blogDialogPage.close();
    });

    it('should create and save Blogs', () => {
        blogComponentsPage.clickOnCreateButton();
        blogDialogPage.setTitleInput('title');
        expect(blogDialogPage.getTitleInput()).toMatch('title');
        blogDialogPage.setAuthorInput('author');
        expect(blogDialogPage.getAuthorInput()).toMatch('author');
        blogDialogPage.setPostInput('post');
        expect(blogDialogPage.getPostInput()).toMatch('post');
        blogDialogPage.save();
        expect(blogDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BlogComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-blog div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class BlogDialogPage {
    modalTitle = element(by.css('h4#myBlogLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    authorInput = element(by.css('input#field_author'));
    postInput = element(by.css('textarea#field_post'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setTitleInput = function (title) {
        this.titleInput.sendKeys(title);
    }

    getTitleInput = function () {
        return this.titleInput.getAttribute('value');
    }

    setAuthorInput = function (author) {
        this.authorInput.sendKeys(author);
    }

    getAuthorInput = function () {
        return this.authorInput.getAttribute('value');
    }

    setPostInput = function (post) {
        this.postInput.sendKeys(post);
    }

    getPostInput = function () {
        return this.postInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
