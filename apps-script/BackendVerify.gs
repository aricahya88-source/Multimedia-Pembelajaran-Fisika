/**
 * Jalankan fungsi ini SEBELUM deploy Web App setelah update backend.
 * Tidak mengubah data. Hanya memeriksa kelengkapan kode, storage, dan sheet.
 */
function verifyBackendInstallation() {
  var checks = [];
  function add(name, ok, detail) {
    checks.push({name:name, ok:!!ok, detail:String(detail||'')});
  }

  // Service/API function checks. Jangan hapus nama dari daftar tanpa mengubah Api.gs.
  var requiredFns = [
    ['loginService_', typeof loginService_ === 'function'],
    ['dashboardService_', typeof dashboardService_ === 'function'],
    ['listWeeksService_', typeof listWeeksService_ === 'function'],
    ['getWeekService_', typeof getWeekService_ === 'function'],
    ['listDiscussionsService_', typeof listDiscussionsService_ === 'function'],
    ['getDiscussionService_', typeof getDiscussionService_ === 'function'],
    ['createPostService_', typeof createPostService_ === 'function'],
    ['listTasksService_', typeof listTasksService_ === 'function'],
    ['taskDataService_', typeof taskDataService_ === 'function'],
    ['submitWorkService_', typeof submitWorkService_ === 'function'],
    ['listGradesService_', typeof listGradesService_ === 'function'],
    ['getQuizService_', typeof getQuizService_ === 'function'],
    ['submitQuizService_', typeof submitQuizService_ === 'function'],
    ['getStaticQuizStatusService_', typeof getStaticQuizStatusService_ === 'function'],
    ['submitStaticQuizService_', typeof submitStaticQuizService_ === 'function'],
    ['getStaticDiscussionPostsService_', typeof getStaticDiscussionPostsService_ === 'function'],
    ['createStaticPostService_', typeof createStaticPostService_ === 'function'],
    ['getStaticActivityProgressService_', typeof getStaticActivityProgressService_ === 'function'],
    ['getProjectPlanService_', typeof getProjectPlanService_ === 'function'],
    ['saveProjectPlanService_', typeof saveProjectPlanService_ === 'function'],
    ['getProjectFinalReportService_', typeof getProjectFinalReportService_ === 'function'],
    ['saveProjectFinalReportService_', typeof saveProjectFinalReportService_ === 'function'],
    ['uploadAssetService_', typeof uploadAssetService_ === 'function'],
    ['adminListMaterials_', typeof adminListMaterials_ === 'function'],
    ['adminSaveMaterial_', typeof adminSaveMaterial_ === 'function'],
    ['adminListActivities_', typeof adminListActivities_ === 'function'],
    ['adminSaveActivity_', typeof adminSaveActivity_ === 'function'],
    ['adminListDiscussions_', typeof adminListDiscussions_ === 'function'],
    ['adminSaveDiscussion_', typeof adminSaveDiscussion_ === 'function'],
    ['adminListQuizzes_', typeof adminListQuizzes_ === 'function'],
    ['adminGetQuiz_', typeof adminGetQuiz_ === 'function'],
    ['adminSaveQuiz_', typeof adminSaveQuiz_ === 'function'],
    ['adminSaveQuizQuestion_', typeof adminSaveQuizQuestion_ === 'function'],
    ['adminDeleteQuizQuestion_', typeof adminDeleteQuizQuestion_ === 'function'],
    ['adminListUsers_', typeof adminListUsers_ === 'function'],
    ['adminSaveUser_', typeof adminSaveUser_ === 'function'],
    ['adminResetPin_', typeof adminResetPin_ === 'function'],
    ['adminImportUsers_', typeof adminImportUsers_ === 'function'],
    ['adminListAnnouncements_', typeof adminListAnnouncements_ === 'function'],
    ['adminSaveAnnouncement_', typeof adminSaveAnnouncement_ === 'function'],
    ['adminListGroups_', typeof adminListGroups_ === 'function'],
    ['adminSaveGroup_', typeof adminSaveGroup_ === 'function'],
    ['adminImportGroups_', typeof adminImportGroups_ === 'function'],
    ['adminListProjectPlans_', typeof adminListProjectPlans_ === 'function'],
    ['adminReviewProjectPlan_', typeof adminReviewProjectPlan_ === 'function'],
    ['adminGradebookActivities_', typeof adminGradebookActivities_ === 'function'],
    ['adminActivityRoster_', typeof adminActivityRoster_ === 'function'],
    ['adminSaveGrade_', typeof adminSaveGrade_ === 'function'],
    ['adminImportGrades_', typeof adminImportGrades_ === 'function'],
    ['adminAddSubmissionComment_', typeof adminAddSubmissionComment_ === 'function'],
    ['adminSeedBundledContent_', typeof adminSeedBundledContent_ === 'function'],
    ['adminExportWorkbook_', typeof adminExportWorkbook_ === 'function'],
    ['adminImportWorkbook_', typeof adminImportWorkbook_ === 'function'],
    ['api', typeof api === 'function'],
    ['doGet', typeof doGet === 'function'],
    ['doPost', typeof doPost === 'function']
  ];
  requiredFns.forEach(function(x){ add('function '+x[0], x[1], x[1]?'OK':'MISSING'); });

  // Storage config / properties.
  var props = PropertiesService.getScriptProperties();
  var sid = String(props.getProperty('SPREADSHEET_ID') || (typeof LMS_STORAGE_CONFIG !== 'undefined' && LMS_STORAGE_CONFIG.SPREADSHEET_ID) || '').trim();
  var fid = String(props.getProperty('ROOT_FOLDER_ID') || (typeof LMS_STORAGE_CONFIG !== 'undefined' && LMS_STORAGE_CONFIG.ROOT_FOLDER_ID) || '').trim();
  add('SPREADSHEET_ID', !!sid && sid.indexOf('PASTE_') !== 0, sid?'configured':'missing');
  add('ROOT_FOLDER_ID', !!fid && fid.indexOf('PASTE_') !== 0, fid?'configured':'missing');

  // Open storage and validate all expected sheets when configured.
  if (sid && sid.indexOf('PASTE_') !== 0) {
    try {
      var ss = SpreadsheetApp.openById(sid);
      add('Spreadsheet open', true, ss.getName());
      Object.keys(LMS.SHEETS).forEach(function(k){
        var sheetName = LMS.SHEETS[k];
        add('sheet '+sheetName, !!ss.getSheetByName(sheetName), ss.getSheetByName(sheetName)?'OK':'MISSING');
      });
      var matsSh=ss.getSheetByName(LMS.SHEETS.MATERIALS);
      if(matsSh&&matsSh.getLastRow()>=2){
        var mh=matsSh.getRange(1,1,1,matsSh.getLastColumn()).getValues()[0].map(String),mi=mh.indexOf('material_id');
        if(mi>=0){
          var mids=matsSh.getRange(2,mi+1,matsSh.getLastRow()-1,1).getValues().map(function(r){return String(r[0]||'');});
          var defaultCount=mids.filter(function(id){return /^MAT0(0[1-9]|1[0-6])$/.test(id);}).length;
          var legacyCount=mids.filter(function(id){return /^MAT0(1[7-9]|2[0-9]|3[0-2])$/.test(id);}).length;
          add('16 default material units',defaultCount===16,'found '+defaultCount);
          add('no legacy 32-material seed',legacyCount===0,legacyCount?('legacy rows '+legacyCount):'OK');
        }
      }
    } catch (e) {
      add('Spreadsheet open', false, e.message);
    }
  }
  if (fid && fid.indexOf('PASTE_') !== 0) {
    try {
      var folder = DriveApp.getFolderById(fid);
      add('Drive root open', true, folder.getName());
    } catch (e2) {
      add('Drive root open', false, e2.message);
    }
  }

  var failed = checks.filter(function(c){return !c.ok;});
  Logger.log(JSON.stringify({ok:failed.length===0, version:LMS.VERSION, failed:failed, checks:checks}, null, 2));
  if (failed.length) {
    throw new Error('Backend belum lengkap. Gagal '+failed.length+' pemeriksaan. Buka Execution log untuk detail.');
  }
  return {ok:true, version:LMS.VERSION, message:'Backend lengkap dan siap dideploy.', checks:checks};
}
