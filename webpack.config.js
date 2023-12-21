process.env.NODE_OPTIONS = "--max_old_space_size=4096";

module.exports = {
  stats: {
    hash: true,
    version: true,
    timings: true,
    children: false,
    errors: true,
    errorDetails: true,
    warnings: true,
    chunks: false,
    modules: false,
    reasons: true,
    source: true,
    publicPath: true,
  },
};
