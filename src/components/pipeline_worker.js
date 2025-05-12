// adapted from https://github.com/huggingface/transformers.js/blob/main/examples/next-client/src/app/worker.js

import { pipeline } from "@huggingface/transformers";

// Use the Singleton pattern to enable lazy construction of the pipeline.
class PipelineSingleton {
  static task = "feature-extraction";
  static model = "Xenova/paraphrase-MiniLM-L3-v2";
  static instance = null;

  static async getInstance(progress_callback = null) {
    this.instance ??= pipeline(this.task, this.model, {
      dtype: "q8",
      progress_callback,
    });
    return this.instance;
  }
}

// Listen for messages from the main thread
self.addEventListener("message", async (event) => {
  // Retrieve the feature extraction pipeline. When called for the first time,
  // this will load the pipeline and save it for future use.
  const extractor = await PipelineSingleton.getInstance((x) => {
    // We also add a progress callback to the pipeline so that we can
    // track model loading.
    self.postMessage(x);
  });

  // Actually perform the feature extraction
  const output = await extractor(event.data.text, {
    pooling: "mean",
    normalize: true,
  });

  // Send the output back to the main thread
  self.postMessage({
    status: "complete",
    output: output.ort_tensor.cpuData,
  });
});
