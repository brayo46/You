import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import {API, API_KEY} from '../config';
import filestack from 'filestack-js';
import { Footer } from 'components';

// Set the API key
const client = filestack.init(API_KEY);

// Filestack URLs
const filestackCDN = 'https://cdn.filestackcontent.com';
const filestackAPI = 'https://process.filestackapi.com';

export default class AddContainer extends Component {

    constructor (props) {
        super(props);
        // Set the URL to empty string
        this.state = { url: ''};
        // Bind to this
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendToServer = this.sendToServer.bind(this);


    }

    async handleClick () {
        // the URL returned by filestack is set in the state
        try {
            // await: pause execution of async function until a promise is fulfilled

            // get the video
            const { filesUploaded } = await this.filestack(); 
            // return url of last uploaded video
            const url = filesUploaded[0].url;
            this.setState({ url });

        } catch(e) {
            console.log(e);
        }
    }

    filestack = () => {
        return client.pick (
            {
                accept: 'video/*',
                maxSize: 1024 * 1024 * 100,
            }
        );
    };

    async sendToServer (uuid) {

        const {state: {url}, title, author } = this;

        // POST to /api/v1/videos to insert a new video in the DB
        try {
            const response = await fetch(API, {
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                },
                body: JSON.stringify ({ 
                    url,
                    title: title.value,
                    author: author.value,
                    // Random values for simplicity 
                    views: Math.floor(Math.random() * 100000) + 1,
                    uploadAt: Math.floor(Math.random() * 23) + 1,
                    uuid,
                    converted: false,


                }),
            });
            return await response.json();
        } catch (e) {
            console.log(e);
        }
    }

    async handleSubmit (e) {

        e.preventDefault();
        const { url } = this.state;
        const curl = '${filestackAPI}/${API_KEY}/video_convert=preset:webm,aspect_mode:preserve/${url.substring(url.lastIndexOf(' / ')+ 1 })';
        /* First we call the process API
        * to start transcoding and get the uuid
        */
        try {
            let response = await fetch(curl);
            response = await response.json();
            const server = await this.sendToServer(response.uuid);
            hashHistory.replace(' / ');

        } catch(e) {
            console.log(e);
        }



    }


    



}