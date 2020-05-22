(function () {
  let interval = null;
  if (!performEnforcements()) {
    retry(function () {
      return performEnforcements();
    })
  }


  /**
   * Retries a function
   * @param {Function} fn
   */
  function retry(fn) {
    interval = null;

    setTimeout(function () {
      interval = setInterval(function () {
        const success = fn();

        if (success) {
          clearInterval(interval);
        }
      }, 2000);
    }, 1000);
  }


  /**
   * @return boolean
   */
  function hasConflicts() {
    return document.documentElement.textContent.includes('<<<<<<< destination') ||
      document.documentElement.textContent.includes('>>>>>>> source')
  }

  function requiresSync() {
    const syncCheck = document.querySelector('[data-qa="pr-commit-list-styles"]');
    const behind = !!(syncCheck.innerText && (syncCheck.innerText.includes('behind') || syncCheck.innerText.includes('Sync now')));
    return behind;
  }

  function findMergeButtons() {
    const reviewers = document.querySelectorAll('[data-qa="pr-header-actions-reviewers-style"]');
    if (!reviewers || !reviewers.length) {
      return false;
    }

    const mergeButtons = [];

    reviewers.forEach((function (item) {
      const mergeButton = item.nextSibling.children[0].children[1].children[0];
      mergeButtons.push(mergeButton);
    }))

    return mergeButtons;
  }

  /**
   * Disables the button
   */
  function disableMergeButtons(buttons, reason) {
    console.log('Disabling merge button', reason);

    try {
      buttons.forEach(function (button) {
        const reasons = JSON.parse(button.dataset.reasons || '[]');
        if (!reasons.includes(reason)) {
          reasons.push(reason);
        }

        const text = `Merge (Disabled) (${reasons.join(', ')})`

        button.setAttribute('disabled', 'disabled');
        button.dataset.reasons = JSON.stringify(reasons);
        button.style.opacity = '0.5';
        button.innerText = text;
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  function performEnforcements() {
    let checkedConflicts = false;
    let checkedSync = false;
    // let disabledDueToSync = false;
    // let disabledDueToConflicts = false;

    const mergeButtons = findMergeButtons();
    if (!mergeButtons || !mergeButtons.length) {
      return false;
    }

    let isConflicted = hasConflicts();
    if (isConflicted) {
      disabledDueToConflicts = disableMergeButtons(mergeButtons, 'Conflicts');
      checkedConflicts = true;
    }

    let isBehind = requiresSync();
    if (isBehind) {
      disabledDueToSync = disableMergeButtons(mergeButtons, 'Behind Target');
      checkedSync = true;
    }

    return checkedConflicts && checkedSync;
  }

})();
