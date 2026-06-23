export async function recordAudioChunk(durationMs = 2000): Promise<Blob> {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
  });

  const track = stream.getAudioTracks()[0];

  console.log("Micro track settings:", track?.getSettings());
  console.log("Micro track enabled:", track?.enabled);
  console.log("Micro track muted:", track?.muted);
  console.log("Micro track readyState:", track?.readyState);

  return new Promise((resolve, reject) => {
    const chunks: BlobPart[] = [];

    let mimeType = "";

    if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
      mimeType = "audio/webm;codecs=opus";
    } else if (MediaRecorder.isTypeSupported("audio/webm")) {
      mimeType = "audio/webm";
    }

    const mediaRecorder = mimeType
      ? new MediaRecorder(stream, { mimeType })
      : new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    mediaRecorder.onerror = () => {
      stream.getTracks().forEach((streamTrack) => streamTrack.stop());
      reject(new Error("Erreur pendant l’enregistrement audio."));
    };

    mediaRecorder.onstop = () => {
      stream.getTracks().forEach((streamTrack) => streamTrack.stop());

      resolve(
        new Blob(chunks, {
          type: mediaRecorder.mimeType || "audio/webm",
        })
      );
    };

    mediaRecorder.start();

    window.setTimeout(() => {
      if (mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
      }
    }, durationMs);
  });
}