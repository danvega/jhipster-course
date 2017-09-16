import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Speaker e2e test', () => {

    let navBarPage: NavBarPage;
    let speakerDialogPage: SpeakerDialogPage;
    let speakerComponentsPage: SpeakerComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Speakers', () => {
        navBarPage.goToEntity('speaker');
        speakerComponentsPage = new SpeakerComponentsPage();
        expect(speakerComponentsPage.getTitle()).toMatch(/Speakers/);

    });

    it('should load create Speaker dialog', () => {
        speakerComponentsPage.clickOnCreateButton();
        speakerDialogPage = new SpeakerDialogPage();
        expect(speakerDialogPage.getModalTitle()).toMatch(/Create or edit a Speaker/);
        speakerDialogPage.close();
    });

    it('should create and save Speakers', () => {
        speakerComponentsPage.clickOnCreateButton();
        speakerDialogPage.setFirstNameInput('firstName');
        expect(speakerDialogPage.getFirstNameInput()).toMatch('firstName');
        speakerDialogPage.setLastNameInput('lastName');
        expect(speakerDialogPage.getLastNameInput()).toMatch('lastName');
        speakerDialogPage.setEmailInput('email');
        expect(speakerDialogPage.getEmailInput()).toMatch('email');
        speakerDialogPage.setTwitterInput('twitter');
        expect(speakerDialogPage.getTwitterInput()).toMatch('twitter');
        speakerDialogPage.setBioInput('bio');
        expect(speakerDialogPage.getBioInput()).toMatch('bio');
        // speakerDialogPage.sessionsSelectLastOption();
        speakerDialogPage.save();
        expect(speakerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SpeakerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-speaker div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class SpeakerDialogPage {
    modalTitle = element(by.css('h4#mySpeakerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    firstNameInput = element(by.css('input#field_firstName'));
    lastNameInput = element(by.css('input#field_lastName'));
    emailInput = element(by.css('input#field_email'));
    twitterInput = element(by.css('input#field_twitter'));
    bioInput = element(by.css('input#field_bio'));
    sessionsSelect = element(by.css('select#field_sessions'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setFirstNameInput = function (firstName) {
        this.firstNameInput.sendKeys(firstName);
    }

    getFirstNameInput = function () {
        return this.firstNameInput.getAttribute('value');
    }

    setLastNameInput = function (lastName) {
        this.lastNameInput.sendKeys(lastName);
    }

    getLastNameInput = function () {
        return this.lastNameInput.getAttribute('value');
    }

    setEmailInput = function (email) {
        this.emailInput.sendKeys(email);
    }

    getEmailInput = function () {
        return this.emailInput.getAttribute('value');
    }

    setTwitterInput = function (twitter) {
        this.twitterInput.sendKeys(twitter);
    }

    getTwitterInput = function () {
        return this.twitterInput.getAttribute('value');
    }

    setBioInput = function (bio) {
        this.bioInput.sendKeys(bio);
    }

    getBioInput = function () {
        return this.bioInput.getAttribute('value');
    }

    sessionsSelectLastOption = function () {
        this.sessionsSelect.all(by.tagName('option')).last().click();
    }

    sessionsSelectOption = function (option) {
        this.sessionsSelect.sendKeys(option);
    }

    getSessionsSelect = function () {
        return this.sessionsSelect;
    }

    getSessionsSelectedOption = function () {
        return this.sessionsSelect.element(by.css('option:checked')).getText();
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
