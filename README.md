# Jiffy

[Electron](http://electron.atom.io) application that allows users to download YouTube videos and convert them to GIFs using a simple an easy to use UI.

## Getting started

- Clone this repository
- `cd jiffy`
- `npm install` to install the application's dependencies
- `npm start` to start the application

## How Jiffy Works (Planned Workflow at least)

1. First, Jiffy determines whether or not a given URL is a valid YouTube video
2. If it is, Jiffy will download the video using `youtube-dl` to `temp.mp4`
3. Once the video download is complete, Jiffy will let the user trim the video and set the GIF conversion settings
4. Jiffy will then use Yahoo's GifShot JS library to convert `temp.mp4` to a GIF
5. User has the option of saving the GIF  

## Done

As of right now, Jiffy is still a work in progress. The following are features currently implemented.

- Enter in YouTube URL and show video preview
- Download YouTube video after user approves of the video preview
- Video is converted to 200x200 GIF when video download is complete

## To Do

The following tasks are either planned or in-progress. 

- Show progress bar when YouTube video is downloading
- Alert the user when the video is done
- Allow user to trim the video (take start and end time)
- Show progress bar when GIF is being generated
- Convert the downloaded `temp.mp4` to a GIF according to settings the user specifies