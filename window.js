// Dependencies
const fs = require('fs')
const youtubedl = require('youtube-dl')

// Helper function to check if a YouTube URL is valid. If so, return the video ID
function validateYouTubeURL (url) {
  if (url !== undefined || url !== '') {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/
    var match = url.match(regExp)
    if (match && match[2].length === 11) {
      return match[2]
    } else {
      return false
    }
  }
}

$(() => {
  let vidID = null

  // Show a preview of the YouTube video before we start download
  $('#vid-submit-button').click(function () {
    // Extract the YouTube video ID from input
    const vidURL = $('#vid-input').val()
    vidID = validateYouTubeURL(vidURL)

    // Show the preview if we get a valid ID. Otherwise, alert user
    if (vidID) {
      $('#youtube-vid-iframe').attr('src', `https://www.youtube.com/embed/${vidID}`)
      $('.youtube-preview').slideDown('slow')
    } else {
      alert('Invalid YouTube URL. Please try again.')
    }
  })

  // When convert button is clicked, download YouTube video
  $('#convert-button').click(function () {
    if (vidID) {
      // Downloads YouTube video via youtubedl w/ some options
      var video = youtubedl(
        `https://www.youtube.com/watch?v=${vidID}`,
        ['--format=18'],
        { cwd: __dirname })

      // Pipes the video download to file `temp.mp4`
      video.pipe(fs.createWriteStream('temp.mp4'))
    }
  })
})
