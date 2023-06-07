# coverage-badge-action&nbsp;&nbsp;[![cov](https://we-cli.github.io/coverage-badge-action/badges/coverage.svg)](https://github.com/we-cli/coverage-badge-action/actions)


## Similar Projects

- https://github.com/jaywcjlove/coverage-badges-cli
- https://github.com/GaelGirodon/ci-badges-action

## Difference

- ✅ No gist-id required
- ✅ No github-token required
- ✅ No entire upload to gh-pages
- ✅ Just patch and push to gh-pages

## Usage

1. Make sure you have gh-pages branch and have GitHub Pages on:

    ```sh
    # if you don't have gh-pages yet, create an empty one
    git stash save my_wip_state  # if not clean (1)
    git switch --orphan gh-pages
    git commit --allow-empty -m "Initial commit"
    git push -u origin gh-pages

    git checkout my_original_branch
    git stash apply stash^{/my_wip_state}  # if not clean (2)
    ```

    See Step.6 in [🚀 Blog Setup via Github Fork](https://fritx.github.io/silent/?2022/09/blog-setup-via-github-fork)

    > 6\. (Important) Select both gh-pages and / (root) in Project Settings -> Pages

1. Give workflow permission:

    On your repository `Settings -> Action -> General -> Workflow permissions` choose `Read and Write permissions`

2. Whatever the coverage tool is, don't forget to have `reporter=json-summary` enabled:

    ```diff
    // package.json
    -  "test:cov": "c8 xv",
    +  "test:cov": "c8 -r text -r json-summary xv",
    // or
    -  "coverage": "nyc mocha",
    +  "coverage": "nyc -r text -r json-summary mocha",
    ```

3. Add the action to your current workflow

    ```yml
    # .github/workflows/test.yml
    name: Test
    on: [push, pull_request, workflow_dispatch]
    jobs:
      test:
        runs-on: ubuntu-latest
        steps:
          # Your original steps
          - uses: actions/checkout@v3
          - uses: actions/setup-node@v3
          - name: Install
            run: npm install
          - name: Test and Coverage
            run: npm run test:cov  # or npm run coverage

          # Add this
          - name: Update Coverage Badge
            # GitHub actions: default branch variable
            # https://stackoverflow.com/questions/64781462/github-actions-default-branch-variable
            if: github.ref == format('refs/heads/{0}', github.event.repository.default_branch)
            uses: we-cli/coverage-badge-action@main
    ```

4. Add the badge to your README.md

    ```diff
    <!-- README.md -->
    + [![cov](https://<you>.github.io/<repo>/badges/coverage.svg)](https://github.com/<you>/<repo>/actions)
    ```

    Replace the `<you>` and `<repo>` above, like:

    ```diff
    <!-- README.md -->
    + [![cov](https://we-cli.github.io/jayin/badges/coverage.svg)](https://github.com/we-cli/jayin/actions)
    ```


    and you get:

    [![cov](https://we-cli.github.io/coverage-badge-action/badges/coverage.svg)](https://github.com/we-cli/coverage-badge-action/actions)
