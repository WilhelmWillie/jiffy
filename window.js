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
  $('.vid-submit-btn').click(function () {
    // Extract the YouTube video ID from input
    const vidURL = $('.yt-vid-input').val()
    vidID = validateYouTubeURL(vidURL)

    // Show the preview if we get a valid ID. Otherwise, alert user
    if (vidID) {
      $('.youtube-vid-iframe').attr('src', `https://www.youtube.com/embed/${vidID}`)
    } else {
      alert('Invalid YouTube URL. Please try again.')
    }
  })

  // When convert button is clicked, download YouTube video
  $('.convert-btn').click(function () {
    if (vidID) {
      // Downloads YouTube video via youtubedl w/ some options
      const video = youtubedl(
        `https://www.youtube.com/watch?v=${vidID}`,
        ['--format=18'],
        { cwd: __dirname })

      // How long the video is in ms
      let duration = 0

      // How many bytes have been downloaded so far
      let progress = 0

      // How many bytes the overall video is
      let size = 0

      // Fade in progress bars
      $('.progress-bars').show()

      // Called when video download starts
      video.on('info', function (info) {
        size = parseInt(info.size)
        duration = parseInt(info.duration * 1000)
      })

      // Update progress for download
      video.on('data', function (chunk) {
        progress += chunk.length

        const downloadPercentage = (progress / size) * 100

        $('.progress-bar-download').css({
          width: downloadPercentage + '%'
        })
      })

      // Pipes the video download to file `temp.mp4`
      video.pipe(fs.createWriteStream('temp.mp4'))

      // Create GIF from video when download is done
      video.on('end', function () {
        gifshot.createGIF({
          'video': ['temp.mp4'],
          'numFrames': (duration / 100),
          'progressCallback': function (captureProgress) {
            // Update the conversion progress bar
            $('.progress-bar-conversion').css({
              width: (captureProgress * 100) + '%'
            })
          }
        }, function (obj) {
          if (!obj.error) {
            var image = obj.image

            // Fade out progress bars, then display generated GIF
            $('.progress-bars').fadeOut('slow', function () {
              $('.result img').hide()
              $('.result img').attr('src', image)
              $('.result img').fadeIn('slow')
            })
          }
        })
      })
    }
  })
})
